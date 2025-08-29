import { Controller, Get } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { ExternalOrderDto } from './dto/external-order.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get('orders')
  async fetchOrders(): Promise<ExternalOrderDto[]> {
    const orders = await this.integrationsService.fetchOrders();
    console.log(orders);
    return orders;
  }
}
