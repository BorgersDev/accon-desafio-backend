import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsService } from './integrations.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AcconOrderDto } from './dto/accon-order.dto';
import { validAcconOrder } from '../mocks/integration.mock';
import { InternalServerErrorException } from '@nestjs/common';

describe('IntegrationsService', () => {
  let service: IntegrationsService;
  let httpService: HttpService;

  const validOrder: AcconOrderDto = validAcconOrder;

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
