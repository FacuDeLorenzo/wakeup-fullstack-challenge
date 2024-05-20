import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { CreateOrderRequest, FinishOrderRequest, Order, OrderDTO } from './types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  UpdateCommand,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
};

exports.get = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  try {
    const req = event.queryStringParameters;
    const restaurantId = parseInt(req.restaurantId);
    if (!restaurantId)
      return {
        isBase64Encoded: false,
        statusCode: 400,
        headers: responseHeaders,
        body: 'restaurantId must be provided',
      };

    const command = new QueryCommand({
      TableName: 'wakeup-challenge-orders',
      ExpressionAttributeValues: {
        ':id': restaurantId,
        ':status': 'active',
      },
      KeyConditionExpression: 'restaurantId = :id',
      FilterExpression: 'orderStatus = :status',
    });
    const response = await docClient.send(command)  as Omit<QueryCommandOutput, "Items"> & { Items: Order[] };

    const orders: OrderDTO[] = response.Items.map((x) => ({
      id: x.orderId,
      totalPrice: x.totalPrice,
      products: x.products,
    }));

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({ orders }),
    };
  } catch (error) {
    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: responseHeaders,
      body: error.message,
    };
  }
};

exports.create = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  try {
    const req: CreateOrderRequest = JSON.parse(event.body);

    if (!req?.products)
      return {
        isBase64Encoded: false,
        statusCode: 400,
        headers: responseHeaders,
        body: 'products must be provided',
      };
    if (!req?.restaurantId)
      return {
        isBase64Encoded: false,
        statusCode: 400,
        headers: responseHeaders,
        body: 'restaurantId must be provided',
      };

    const orderId = uuid();
    const totalPrice = req.products.reduce(
      (acc, val) => acc + val.product.price,
      0,
    );
    const command = new PutCommand({
      TableName: 'wakeup-challenge-orders',
      Item: {
        restaurantId: req.restaurantId,
        orderId,
        products: req.products,
        totalPrice,
        orderStatus: 'active',
      },
    });
    await docClient.send(command)  as Omit<PutCommandOutput, "Item"> & { Item: Order };

    const order: OrderDTO = {
      id: orderId,
      products: req.products,
      totalPrice,
    };
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(order),
    };
  } catch (error) {
    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: responseHeaders,
      body: error.message,
    };
  }
};

exports.finish = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  try {
    const req: FinishOrderRequest = JSON.parse(event.body);

    if (!req.orderId)
      return {
        isBase64Encoded: false,
        statusCode: 400,
        headers: responseHeaders,
        body: 'orderId must be provided',
      };
    if (!req.restaurantId)
      return {
        isBase64Encoded: false,
        statusCode: 400,
        headers: responseHeaders,
        body: 'restaurantId must be provided',
      };

    const command = new UpdateCommand({
      TableName: 'wakeup-challenge-orders',
      Key: {
        restaurantId: req.restaurantId,
      },
      UpdateExpression: 'set orderStatus = :orderStatus',
      ConditionExpression: 'orderId = :orderId',
      ExpressionAttributeValues: {
        ':orderStatus': 'finished',
        ':orderId': req.orderId,
      },
      ReturnValues: 'ALL_NEW',
    });
    const response = await docClient.send(command) as Omit<UpdateCommandOutput, "Item"> & { Item: Order };
    console.log('response: ', response);

    const updatedItem = response.Attributes;
    const updatedOrder: OrderDTO = {
      id: updatedItem.orderId,
      products: updatedItem.products,
      totalPrice: updatedItem.totalPrice,
    };

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(updatedOrder),
    };
  } catch (error) {
    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: responseHeaders,
      body: error.message,
    };
  }
};
