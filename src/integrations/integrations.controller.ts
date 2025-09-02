import { Controller, Get } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { OrdersService } from '../orders/orders.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private readonly integrationsService: IntegrationsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get('orders')
  async fetchOrders(): Promise<{
    message: string;
    count?: number;
    error?: string;
  }> {
    return await this.ordersService.fetchAndPersistOrdersFromIntegration(
      'accon',
      this.integrationsService,
    );
  }
}
