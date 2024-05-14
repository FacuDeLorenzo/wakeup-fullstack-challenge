import { Controller, Get, Post } from '@nestjs/common';
import { AppService, CreateOrderRequest, Order, Product } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("products")
  products(): Product[] {
    const products = this.appService.getProducts();
    return products;
  }
  
  @Post("/createOrder")
  createOrder(req: CreateOrderRequest): Order {
    return this.appService.createOrder(req);
  }
}
