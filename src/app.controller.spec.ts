import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersService } from './orders/orders.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const ordersServiceMock = {
      findAll: jest.fn().mockResolvedValue([]),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: OrdersService, useValue: ordersServiceMock },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return orders array from dashboard', async () => {
      // Mock o retorno do AppService
      const mockOrders = [
        {
          id: 1,
          customer: 'Test',
          date: new Date(),
          total: 100,
          itemsCount: 2,
        },
      ];
      appController['appService'].getDashboardOrders = jest
        .fn()
        .mockResolvedValue(mockOrders);
      const result = await appController.dashboard();
      expect(result).toEqual({ orders: mockOrders });
    });
  });
});
