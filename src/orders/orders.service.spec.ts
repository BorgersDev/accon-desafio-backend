import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Merchant } from './entities/merchant.entity';
import { Customer } from './entities/customer.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: any;

  // Mock for Order entity
  const mockOrderEntity: Order = {
    id: '1',
    type: 'DELIVERY',
    display_id: '123',
    created_at: new Date(),
    persisted_at: new Date(),
    order_timing: 'INSTANT',
    preparation_start: new Date(),
    extra_info: '',
    items: [],
    payments: [],
    customer: {
      id: 'c1',
      name: 'Customer',
      document_number: '123',
      email: 'a@a.com',
      phone: '999',
      orders_count: 1,
      orders: [],
    } as Customer,
    merchant: {
      id: 'm1',
      name: 'Store',
      orders: [],
    } as Merchant,
    total: {
      order_id: '1',
      subtotal: 10,
      delivery_fee: 0,
      other_fees: 0,
      discount: 0,
      order_amount: 10,
      currency: 'BRL',
      order: undefined as any,
    },
  };

  // Mock for OpenDeliveryOrderDto
  const mockOrderDto = {
    id: '1',
    type: 'DELIVERY',
    displayId: '123',
    createdAt: new Date().toISOString(),
    orderTiming: 'INSTANT',
    preparationStartDateTime: new Date().toISOString(),
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
      prepaid: 10,
      pending: 0,
      methods: [
        {
          id: 'p1',
          type: 'CASH',
          method: 'CASH',
          brand: 'N/A',
          value: 10,
          currency: 'BRL',
        },
      ],
    },
    extraInfo: '',
  };

  beforeEach(async () => {
    orderRepository = {
      create: jest.fn().mockImplementation((data) => data),
      save: jest.fn().mockResolvedValue(mockOrderEntity),
      find: jest.fn().mockResolvedValue([mockOrderEntity]),
      findOne: jest.fn().mockResolvedValue(mockOrderEntity),
      delete: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: orderRepository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const result = await service.create(mockOrderEntity);
    expect(orderRepository.create).toHaveBeenCalledWith(mockOrderEntity);
    expect(orderRepository.save).toHaveBeenCalledWith(mockOrderEntity);
    expect(result).toEqual(mockOrderEntity);
  });

  it('should find all orders', async () => {
    const result = await service.findAll();
    expect(orderRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockOrderEntity]);
  });

  it('should find one order by id', async () => {
    const result = await service.findOne('1');
    expect(orderRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: expect.any(Array),
    });
    expect(result).toEqual(mockOrderEntity);
  });

  it('should remove an order', async () => {
    await service.remove('1');
    expect(orderRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should persist multiple orders', async () => {
    const ordersArray = [mockOrderDto, mockOrderDto];
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValue(mockOrderEntity);
    await service.persistOrders(ordersArray);
    expect(createSpy).toHaveBeenCalledTimes(2);
  });
});
