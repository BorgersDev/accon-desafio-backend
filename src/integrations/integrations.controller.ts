import { Controller, Get } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { OpenDeliveryOrderDto } from './dto/open-delivery-order.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get('orders')
  async fetchOrders(): Promise<OpenDeliveryOrderDto[]> {
    const orders = await this.integrationsService.fetchOrders('accon');
    console.log(orders);
    return orders;
  }
}
