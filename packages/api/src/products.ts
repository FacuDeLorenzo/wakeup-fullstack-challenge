import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { CreateOrderRequest, Order, Product } from './types';
import {
  BatchWriteItemCommand,
  DynamoDBClient,
  WriteRequest,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

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
        body: 'RestaurantId must be provided',
      };

    const lastKey = req.lastKey ? JSON.parse(req.lastKey) : undefined;

    const limit = req.limit ? Number(req.limit) : 5;
    const offset = req.offset ? Number(req.offset) : 0;

    const command = new QueryCommand({
      ExpressionAttributeValues: {
        ':id': restaurantId,
      },
      KeyConditionExpression: 'restaurantId = :id',
      TableName: 'wakeup-challenge-products',
      Limit: limit,
      ExclusiveStartKey: lastKey,
    });
    const response = await docClient.send(command);
    console.log('response: ', response);

    const productsDB: Product[] = response.Items.map((x) => ({
      id: x.productId,
      name: x.name,
      price: x.price,
    }));
    const newLastKey = response.LastEvaluatedKey;

    // const productsDB: Product[] = [
    //   { id: 1, name: 'Kuva Roast Rib Eye', price: 418 },
    //   { id: 2, name: 'Guadalupe Half Rack', price: 298 },
    //   { id: 3, name: 'Tohono Chicken', price: 308 },
    //   { id: 4, name: 'Milanesa napolitana', price: 500 },
    //   { id: 5, name: 'Asado', price: 800 },
    //   { id: 6, name: 'Choripan', price: 230 },
    //   { id: 7, name: 'Asado x4', price: 2700 },
    //   { id: 8, name: 'Kuva Roast Rib Eye', price: 418 },
    //   { id: 9, name: 'Guadalupe Half Rack', price: 298 },
    //   { id: 10, name: 'Tohono Chicken', price: 308 },
    //   { id: 11, name: 'Milanesa napolitana', price: 500 },
    //   { id: 12, name: 'Asado', price: 800 },
    //   { id: 13, name: 'Choripan', price: 230 },
    //   { id: 14, name: 'Asado x45', price: 2700 },
    //   { id: 15, name: 'Asado', price: 800 },
    //   { id: 16, name: 'Choripan', price: 230 },
    //   { id: 17, name: 'Asado x455', price: 2700 },
    // ];

    const products = productsDB.slice(offset, offset + limit);

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({ products, lastKey: newLastKey }),
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

exports.createOrder = async (
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
        body: 'Products must be provided',
      };
    const order: Order = {
      products: req.products,
      totalPrice: req.products.reduce((acc, val) => acc + val.product.price, 0),
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
