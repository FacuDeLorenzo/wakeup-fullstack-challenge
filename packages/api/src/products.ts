import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { CreateOrderRequest, Order, Product } from './types';

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
    console.log('queryStringParameters!: ', event.queryStringParameters);
    const req = event.queryStringParameters;
    if (!req?.restaurantId)
      return {
        isBase64Encoded: false,
        statusCode: 400,
        headers: responseHeaders,
        body: 'RestaurantId must be provided',
      };
    const limit = req.limit ? Number(req.limit) : 5;
    const offset = req.offset ? Number(req.offset) : 0;

    const productsDB: Product[] = [
      { id: 1, name: 'Kuva Roast Rib Eye', price: 418 },
      { id: 2, name: 'Guadalupe Half Rack', price: 298 },
      { id: 3, name: 'Tohono Chicken', price: 308 },
      { id: 4, name: 'Milanesa napolitana', price: 500 },
      { id: 5, name: 'Asado', price: 800 },
      { id: 6, name: 'Choripan', price: 230 },
      { id: 7, name: 'Asado x4', price: 2700 },
      { id: 8, name: 'Kuva Roast Rib Eye', price: 418 },
      { id: 9, name: 'Guadalupe Half Rack', price: 298 },
      { id: 10, name: 'Tohono Chicken', price: 308 },
      { id: 11, name: 'Milanesa napolitana', price: 500 },
      { id: 12, name: 'Asado', price: 800 },
      { id: 13, name: 'Choripan', price: 230 },
      { id: 14, name: 'Asado x45', price: 2700 },
      { id: 15, name: 'Asado', price: 800 },
      { id: 16, name: 'Choripan', price: 230 },
      { id: 17, name: 'Asado x45', price: 2700 },
    ];

    const products = productsDB.slice(offset, offset + limit);
    const hasMore = productsDB.length > offset + limit;

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({ products, hasMore }),
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
      totalPrice: req.products.reduce((acc, val) => acc + val.price, 0),
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
