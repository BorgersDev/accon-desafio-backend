import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { mockOrderDto } from '../mocks/order.mock';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn().mockResolvedValue(mockOrderDto),
      findAll: jest.fn().mockResolvedValue([mockOrderDto]),
      findOne: jest.fn().mockResolvedValue(mockOrderDto),
      remove: jest.fn().mockResolvedValue(undefined),
      persistOrders: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const result = await controller.create(mockOrderDto);
    expect(service.create).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual(mockOrderDto);
  });

  it('should find all orders', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockOrderDto]);
  });

  it('should find one order by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockOrderDto);
  });
});
