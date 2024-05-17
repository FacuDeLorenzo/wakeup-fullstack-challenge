import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Restaurant } from './types';

const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'OPTIONS,GET, POST',
};

exports.get = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  try {
    const req = event.queryStringParameters;

    const limit = req.limit ? Number(req.limit) : 5;
    const offset = req.offset ? Number(req.offset) : 0;

    const restaurantsDB: Restaurant[] = [
      { id: 1, name: 'Big restaurant' },
      { id: 2, name: 'China here' },
      { id: 3, name: 'La parri argenta' },
      { id: 4, name: 'Small restaurant' },
      { id: 5, name: 'China there' },
      { id: 6, name: 'La re parri argenta' },
      { id: 7, name: 'Big restaurant' },
      { id: 8, name: 'China here' },
      { id: 9, name: 'La parri argenta' },
      { id: 10, name: 'Small restaurant' },
      { id: 11, name: 'China there' },
      { id: 12, name: 'La re parri argenta 3.0' },
    ];

    const restaurants = restaurantsDB.slice(offset, offset + limit);
    const hasMore = restaurantsDB.length > offset + limit;

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({ restaurants, hasMore }),
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
