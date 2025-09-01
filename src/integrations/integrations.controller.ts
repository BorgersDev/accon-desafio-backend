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
    try {
      const orders = await this.integrationsService.fetchOrders('accon');
      await this.ordersService.persistOrders(orders);
      return {
        message: 'Orders persisted successfully',
        count: orders.length,
      };
    } catch (error) {
      return {
        message: 'Failed to persist orders',
        error: error?.message || String(error),
      };
    }
  }
}
