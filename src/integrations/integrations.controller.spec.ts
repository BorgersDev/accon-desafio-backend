import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { OrdersService } from '../orders/orders.service';
import { mockOrderDto, mockOrderArray } from '../mocks/order.mock';

describe('IntegrationsController', () => {
  let controller: IntegrationsController;
  let integrationsService: IntegrationsService;
  let ordersService: OrdersService;

  const mockOrders = [mockOrderDto];

  beforeEach(async () => {
    const integrationsServiceMock = {
      fetchOrders: jest.fn().mockResolvedValue(mockOrders),
    };
    const ordersServiceMock = {
      fetchAndPersistOrdersFromIntegration: jest.fn().mockResolvedValue({
        message: 'Orders persisted successfully',
        count: mockOrders.length,
      }),
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
    expect(
      (ordersService as any).fetchAndPersistOrdersFromIntegration,
    ).toHaveBeenCalledWith('accon', integrationsService);
    expect(result).toEqual({
      message: 'Orders persisted successfully',
      count: mockOrders.length,
    });
  });

  it('should handle error when persisting order', async () => {
    (
      ordersService as any
    ).fetchAndPersistOrdersFromIntegration.mockResolvedValueOnce({
      message: 'Failed to persist orders',
      error: 'DB error',
    });
    const result = await controller.fetchOrders();
    expect(result).toEqual({
      message: 'Failed to persist orders',
      error: 'DB error',
    });
  });
});
