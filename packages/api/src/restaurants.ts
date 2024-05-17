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
    const restaurants: Restaurant[] = [
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
      { id: 12, name: 'La re parri argenta' },
    ];

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(restaurants),
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
