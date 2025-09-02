import { Injectable } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';

@Injectable()
export class AppService {
  constructor(private readonly ordersSerice: OrdersService) {}

  async getDashboardOrders() {
    const orders = await this.ordersSerice.findAll();
    const mappedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.customer?.name || 'Unknown',
      date: order.persisted_at,
      total: order.total?.order_amount || 0,
      itemsCount: order.items?.length || 0,
    }));
    return mappedOrders;
  }
}
