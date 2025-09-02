import { Test, TestingModule } from '@nestjs/testing';
import { OrderSyncService } from './order-sync.service';
import { OrdersService } from '../../orders/orders.service';
import { IntegrationsService } from '../integrations.service';

describe('OrderSyncService', () => {
  let service: OrderSyncService;
  let ordersService: OrdersService;
  let integrationsService: IntegrationsService;

  beforeEach(async () => {
    const ordersServiceMock = {
      fetchAndPersistOrdersFromIntegration: jest
        .fn()
        .mockResolvedValue({ message: 'ok' }),
    };
    const integrationsServiceMock = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderSyncService,
        { provide: OrdersService, useValue: ordersServiceMock },
        { provide: IntegrationsService, useValue: integrationsServiceMock },
      ],
    }).compile();

    service = module.get<OrderSyncService>(OrderSyncService);
    ordersService = module.get<OrdersService>(OrdersService);
    integrationsService = module.get<IntegrationsService>(IntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call fetchAndPersistOrdersFromIntegration on syncOrders', async () => {
    await service.syncOrders();
    expect(
      ordersService.fetchAndPersistOrdersFromIntegration,
    ).toHaveBeenCalledWith('accon', integrationsService);
  });
});
