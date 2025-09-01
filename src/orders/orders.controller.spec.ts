import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OpenDeliveryOrderDto } from './dto/open-delivery-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrderDto: OpenDeliveryOrderDto = {
    id: '1',
    type: 'DELIVERY',
    displayId: '123',
    createdAt: new Date().toISOString(),
    orderTiming: 'INSTANT',
    preparationStartDateTime: new Date().toISOString(),
    extraInfo: '',
    merchant: { id: 'm1', name: 'Store' },
    customer: {
      id: 'c1',
      name: 'Customer',
      documentNumber: '123',
      email: 'a@a.com',
      phone: { number: '999' },
      ordersCountOnMerchant: 1,
    },
    items: [],
    total: {
      subTotal: { value: 10, currency: 'BRL' },
      deliveryFee: { value: 0, currency: 'BRL' },
      otherFees: { value: 0, currency: 'BRL' },
      discount: { value: 0, currency: 'BRL' },
      orderAmount: { value: 10, currency: 'BRL' },
    },
    payments: {
      prepaid: 0,
      pending: 10,
      methods: [
        {
          id: 'p1',
          type: 'PENDING',
          method: 'CASH',
          brand: '',
          value: 10,
          currency: 'BRL',
        },
      ],
    },
  };

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
