import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, CreateOrderRequest, Order, Product } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('getProducts', () => {
    it('should return products', () => {
      const products: Product[] = [
        { name: 'Kuva Roast Rib Eye', price: 418 },
        { name: 'Guadalupe Half Rack', price: 298 },
        { name: 'Tohono Chicken', price: 308 },
      ];

      jest.spyOn(appService, 'getProducts').mockImplementation(() => products);
      expect(appController.getProducts()).toBe(products);
    });
  });

  describe('createOrder', () => {
    it('should create order and return it', () => {
      const products: Product[] = [
        { name: 'Kuva Roast Rib Eye', price: 418 },
        { name: 'Guadalupe Half Rack', price: 298 },
        { name: 'Tohono Chicken', price: 308 },
      ];
      const req: CreateOrderRequest = {
        products,
      };
      const order: Order = {
        products,
        totalPrice: 1024,
      };
      

      jest.spyOn(appService, 'createOrder').mockImplementation(() => order);
      expect(appController.createOrder(req)).toBe(order);
    });
  });
});
