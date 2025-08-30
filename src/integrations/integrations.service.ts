import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AcconOrderAdapter } from './adapters/accon-order.adapter';
import { OpenDeliveryOrderDto } from './dto/open-delivery-order.dto';
import { IOrderIntegrationAdapter } from './adapters/iorder-integration-adapter';

@Injectable()
export class IntegrationsService {
  private readonly adapters: { [key: string]: IOrderIntegrationAdapter } = {
    accon: new AcconOrderAdapter(),
    // ifood: new IfoodOrderAdapter(), // future adapter for iFood
  };
  private readonly apiUrls: { [key: string]: string } = {
    accon: 'https://desafio-api.accon.com.br/orders',
    // ifood: 'https://api.iffod.com/orders', // future adapter for iFood
  };

  constructor(private readonly httpService: HttpService) {}

  async fetchOrders(source: string): Promise<OpenDeliveryOrderDto[]> {
    const adapter = this.adapters[source];
    const apiUrl = this.apiUrls[source];

    if (!adapter || !apiUrl) {
      throw new InternalServerErrorException(
        `Integration for ${source} not configured`,
      );
    }
    try {
      const response = await firstValueFrom(this.httpService.get(apiUrl));
      if (!response?.data) {
        throw new InternalServerErrorException(
          'No data received from orders API',
        );
      }
      // adapter will transform every order into it's respective api:
      return response.data.map((order: any) => adapter.toOpenDelivery(order));
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch orders from orders API',
      );
    }
  }
}
