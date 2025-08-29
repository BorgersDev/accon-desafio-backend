import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { ExternalOrderDto } from './dto/external-order.dto';

describe('IntegrationsController', () => {
  let controller: IntegrationsController;
  let service: IntegrationsService;

  const mockOrders: ExternalOrderDto[] = [
    {
      _id: '1',
      delivery: true,
      canceled: false,
      scheduled: false,
      network: '',
      sequential: 1,
      store: {
        _id: '',
        name: '',
        address: {
          zip: '',
          state: '',
          city: '',
          address: '',
          number: '',
          complement: '',
          district: '',
          name: '',
          is_active: true,
          created_at: '',
          latlng: { lat: 0, lng: 0 },
        },
        deliveryTime: '',
        toGoTime: '',
        details: {
          whatsapp: { is_active: false },
          email: '',
          phone: '',
          socialName: '',
          storePhone: '',
          document: '',
        },
      },
      user: {
        _id: '',
        name: '',
        document: '',
        email: '',
        phone: '',
        totalOrders: 0,
      },
      address: {
        zip: '',
        state: '',
        city: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        name: '',
        is_active: true,
        created_at: '',
        latlng: { lat: 0, lng: 0 },
      },
      discount: 0,
      subtotal: 0,
      deliveryTax: 0,
      date: '',
      voucher: {
        _id: '',
        stores: [],
        fidelity: false,
        products: [],
        percent: false,
        usage: 0,
        recurrent: false,
        usagePerUser: 0,
        firstOrder: false,
        on_list: false,
        is_active: false,
        name: '',
        text: '',
        value: 0,
        quantity: 0,
        type: '',
        rules: '',
        start_at: '',
        expires_at: '',
        rede: '',
        time: [],
        created_at: '',
        updated_at: '',
        filed: false,
        minOrderValue: 0,
      },
      notes: '',
      document: '',
      ip: '',
      change: 0,
      source: '',
      status: [],
      total: 0,
      payment: {
        online: false,
        name: '',
        cod: '',
        externalVendorCode: '',
      },
      products: [],
    },
  ];

  beforeEach(async () => {
    const serviceMock = {
      fetchOrders: jest.fn().mockResolvedValue(mockOrders),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsController],
      providers: [{ provide: IntegrationsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<IntegrationsController>(IntegrationsController);
    service = module.get<IntegrationsService>(IntegrationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return orders from service', async () => {
    const result = await controller.fetchOrders();
    expect(result).toEqual(mockOrders);
    expect(service.fetchOrders).toHaveBeenCalled();
  });
});
