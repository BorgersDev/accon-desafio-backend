import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { OrdersService } from '../orders/orders.service';

describe('IntegrationsController', () => {
  let controller: IntegrationsController;
  let integrationsService: IntegrationsService;
  let ordersService: OrdersService;

  const mockOrders = [
    {
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
    },
  ];

  beforeEach(async () => {
    const integrationsServiceMock = {
      fetchOrders: jest.fn().mockResolvedValue(mockOrders),
    };
    const ordersServiceMock = {
      persistOrders: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsController],
      providers: [
        { provide: IntegrationsService, useValue: integrationsServiceMock },
        { provide: OrdersService, useValue: ordersServiceMock },
      ],
    }).compile();

    controller = module.get<IntegrationsController>(IntegrationsController);
    integrationsService = module.get<IntegrationsService>(IntegrationsService);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should persist external orders and return success message', async () => {
    const result = await controller.fetchOrders();
    expect(integrationsService.fetchOrders).toHaveBeenCalledWith('accon');
    expect(ordersService.persistOrders).toHaveBeenCalledWith(mockOrders);
    expect(result).toEqual({
      message: 'Orders persisted successfully',
      count: mockOrders.length,
    });
  });

  it('should handle error when persisting order', async () => {
    (ordersService.persistOrders as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    const result = await controller.fetchOrders();
    expect(result).toEqual({
      message: 'Failed to persist orders',
      error: 'DB error',
    });
  });
});
