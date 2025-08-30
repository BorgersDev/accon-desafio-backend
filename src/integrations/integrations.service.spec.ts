import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsService } from './integrations.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AcconOrderDto } from './dto/accon-order.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('IntegrationsService', () => {
  let service: IntegrationsService;
  let httpService: HttpService;

  const mockOrders: AcconOrderDto[] = [
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
    const httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationsService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<IntegrationsService>(IntegrationsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return orders when API responds', async () => {
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: mockOrders }),
    );
    const result = await service.fetchOrders('accon');
    expect(result).toEqual(mockOrders);
  });

  it('should throw error when API returns null data', async () => {
    (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: null }));
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw error when API call fails', async () => {
    (httpService.get as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('API error')),
    );
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
