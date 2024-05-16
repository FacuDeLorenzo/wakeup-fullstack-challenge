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
    const products: Product[] = [
      { name: 'Kuva Roast Rib Eye', price: 418 },
      { name: 'Guadalupe Half Rack', price: 298 },
      { name: 'Tohono Chicken', price: 308 },
    ];

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(products),
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
        body: "Products must be provided",
    }
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


