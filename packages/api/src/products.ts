import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { ProductDTO } from './types';
import {
  DynamoDBClient,
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

    const products: ProductDTO[] = response.Items.map((x) => ({
      id: x.productId,
      name: x.name,
      price: x.price,
    }));
    const newLastKey = response.LastEvaluatedKey;

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
