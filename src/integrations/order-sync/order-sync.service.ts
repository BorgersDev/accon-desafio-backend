import { Injectable } from '@nestjs/common';
import { OrdersService } from '../../orders/orders.service';
import { IntegrationsService } from '../integrations.service';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class OrderSyncService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly integrationsService: IntegrationsService,
  ) {}

  @Interval(30000)
  async syncOrders() {
    await this.ordersService.fetchAndPersistOrdersFromIntegration(
      'accon',
      this.integrationsService,
    );
  }
}
