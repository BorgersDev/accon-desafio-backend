import { Test, TestingModule } from '@nestjs/testing';
import { OrdersGateway } from './orders.gateway';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { mockOrder, mockOrderDto } from '../mocks/order.mock';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: any;

  const mockOrderEntity: Order = mockOrder;

  beforeEach(async () => {
    orderRepository = {
      create: jest.fn().mockImplementation((data) => data),
      save: jest.fn().mockResolvedValue(mockOrderEntity),
      find: jest.fn().mockResolvedValue([mockOrderEntity]),
      findOne: jest.fn().mockResolvedValue(mockOrderEntity),
      delete: jest.fn().mockResolvedValue({}),
    };

    const mockOrdersGateway = {
      notifyOrdersChanged: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: orderRepository,
        },
        {
          provide: OrdersGateway,
          useValue: mockOrdersGateway,
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
    expect(orderRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockOrderEntity.id,
        type: mockOrderEntity.type,
        display_id: mockOrderEntity.display_id,
        order_timing: mockOrderEntity.order_timing,
        extra_info: mockOrderEntity.extra_info,
        customer: mockOrderEntity.customer,
        merchant: mockOrderEntity.merchant,
        total: mockOrderEntity.total,
        created_at: expect.any(Date),
        persisted_at: expect.any(Date),
        preparation_start: expect.any(Date),
      }),
    );
    expect(orderRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockOrderEntity.id,
        type: mockOrderEntity.type,
        display_id: mockOrderEntity.display_id,
        order_timing: mockOrderEntity.order_timing,
        extra_info: mockOrderEntity.extra_info,
        customer: mockOrderEntity.customer,
        merchant: mockOrderEntity.merchant,
        total: mockOrderEntity.total,
        created_at: expect.any(Date),
        persisted_at: expect.any(Date),
        preparation_start: expect.any(Date),
      }),
    );
    expect(result).toHaveProperty('id', mockOrderEntity.id);
    expect(result).toHaveProperty('customer');
    expect(result).toHaveProperty('merchant');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('created_at');
    expect(result).toHaveProperty('persisted_at');
    expect(result).toHaveProperty('preparation_start');
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
