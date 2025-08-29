import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExternalOrderDto } from './dto/external-order.dto';

@Injectable()
export class IntegrationsService {
  private readonly apiUrl = 'https://desafio-api.accon.com.br/orders';

  constructor(private readonly httpService: HttpService) {}

  async fetchOrders(): Promise<ExternalOrderDto[]> {
    try {
      const response = await firstValueFrom(this.httpService.get(this.apiUrl));
      if (!response?.data) {
        throw new InternalServerErrorException(
          'No data received from orders API',
        );
      }
      return response.data as ExternalOrderDto[];
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch orders from orders API',
      );
    }
  }
}
