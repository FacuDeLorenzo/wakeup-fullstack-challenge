import { Injectable } from '@nestjs/common';

export interface CreateOrderRequest {
  products: Product[];
}

export interface Product {
  name: string;
  price: number;
}
export interface Order {
  products: Product[];
  totalPrice: number;
}

@Injectable()
export class AppService {
  getProducts(): Product[] {
    const products: Product[] = [
      { name: 'Kuva Roast Rib Eye', price: 418 },
      { name: 'Guadalupe Half Rack', price: 298 },
      { name: 'Tohono Chicken', price: 308 },
    ];
    return products;
  }
  createOrder({ products }: CreateOrderRequest): Order {
    const order: Order = {
      products,
      totalPrice: products.reduce((acc, val) => acc + val.price, 0),
    };
    return order;
  }
}
