import { Injectable } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';

@Injectable()
export class AppService {
  constructor(private readonly ordersService: OrdersService) {}

  fmtBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  async getDashboardOrders() {
    const orders = await this.ordersService.findRecent();
    const mappedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.customer?.name || 'Unknown',
      date: order.persisted_at,
      total: this.fmtBRL.format(order.total?.order_amount || 0),
      items: order.items,
    }));
    return mappedOrders;
  }
}
