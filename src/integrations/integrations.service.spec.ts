import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsService } from './integrations.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AcconOrderDto } from './dto/accon-order.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('IntegrationsService', () => {
  let service: IntegrationsService;
  let httpService: HttpService;

  const validOrder: AcconOrderDto = {
    _id: 'valid-id',
    delivery: true,
    canceled: false,
    scheduled: false,
    network: '',
    sequential: 1,
    store: {
      _id: 'store-id',
      name: 'Loja Teste',
      address: {
        zip: '12345-678',
        state: 'SP',
        city: 'São Paulo',
        address: 'Rua Teste',
        number: '100',
        complement: '',
        district: 'Centro',
        name: 'Loja',
        is_active: true,
        created_at: '',
        latlng: { lat: 0, lng: 0 },
      },
      deliveryTime: '',
      toGoTime: '',
      details: {
        whatsapp: { is_active: false },
        email: 'loja@teste.com',
        phone: '11999999999',
        socialName: '',
        storePhone: '',
        document: '',
      },
    },
    user: {
      _id: 'user-id',
      name: 'Usuário Teste',
      document: '12345678900',
      email: 'usuario@teste.com',
      phone: '11988888888',
      totalOrders: 1,
    },
    address: {
      zip: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      address: 'Rua Teste',
      number: '100',
      complement: '',
      district: 'Centro',
      name: 'Casa',
      is_active: true,
      created_at: '',
      latlng: { lat: 0, lng: 0 },
    },
    discount: 5,
    subtotal: 50,
    deliveryTax: 5,
    date: '2024-01-01T00:00:00.000Z',
    voucher: {
      _id: 'voucher-id',
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
    notes: 'Sem cebola',
    document: '',
    ip: '',
    change: 0,
    source: '',
    status: [],
    total: 50,
    payment: {
      online: false,
      name: 'DINHEIRO',
      cod: 'pay-id',
      externalVendorCode: '',
    },
    products: [
      {
        id: 'prod-id',
        name: 'Pizza',
        quantity: 1,
        total: 50,
        modifiers: [
          {
            id: 'mod-id',
            name: 'Bacon',
            price: {
              actualPrice: 5,
              originalPrice: 0,
              starterPrice: 0,
            },
            quantity: 1,
            group: 'group-id',
          },
        ],
        rating: { improvements: [] },
        externalVendors: { status: [] },
        externalDelivery: { status: [] },
        notes: '',
      },
    ],
  };

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

  it('should return orders in OpenDelivery format', async () => {
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: [validOrder] }),
    );
    const result = await service.fetchOrders('accon');
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('items');
    expect(result[0].items[0]).toHaveProperty('options');
  });

  it('should throw error if _id is missing', async () => {
    const invalidOrder = { ...validOrder, _id: undefined };
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: [invalidOrder] }),
    );
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      'must have required property ID',
    );
  });

  it('should throw error if store name is missing', async () => {
    const invalidOrder = {
      ...validOrder,
      store: { ...validOrder.store, name: undefined },
    };
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: [invalidOrder] }),
    );
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      'must have required property store name',
    );
  });

  it('should throw error if user name is missing', async () => {
    const invalidOrder = {
      ...validOrder,
      user: { ...validOrder.user, name: undefined },
    };
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: [invalidOrder] }),
    );
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      'must have required property user name',
    );
  });

  it('should throw error if products array is empty', async () => {
    const invalidOrder = { ...validOrder, products: [] };
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: [invalidOrder] }),
    );
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      'must have require property Items',
    );
  });

  it('should throw error if total is missing', async () => {
    const invalidOrder = { ...validOrder, total: undefined };
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: [invalidOrder] }),
    );
    await expect(service.fetchOrders('accon')).rejects.toThrow(
      'must have required property total',
    );
  });

  it('should return empty array if no orders', async () => {
    (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: [] }));
    const result = await service.fetchOrders('accon');
    expect(result).toEqual([]);
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
