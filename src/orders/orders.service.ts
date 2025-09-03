import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { mapDtoToOrderEntity } from './mappers/order.mapper';
import { OpenDeliveryOrderDto } from './dto/open-delivery-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create({
      ...orderData,
      persisted_at: new Date(),
    });
    return this.orderRepository.save(order);
  }

  async persistOrders(dtos: OpenDeliveryOrderDto[]): Promise<void> {
    for (const dto of dtos) {
      const orderEntity = mapDtoToOrderEntity(dto);
      await this.create(orderEntity);
    }
  }
  async fetchAndPersistOrdersFromIntegration(
    source: string,
    integrationsService: any,
  ): Promise<{ message: string; count?: number; error?: string }> {
    try {
      const orders = await integrationsService.fetchOrders(source);
      await this.persistOrders(orders as OpenDeliveryOrderDto[]);
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

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: [
        'items',
        'items.options',
        'customer',
        'merchant',
        'payments',
        'total',
      ],
    });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        'items',
        'items.options',
        'customer',
        'merchant',
        'payments',
        'total',
      ],
    });
  }

  async findRecent(minutes: number = 10): Promise<Order[]> {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    return this.orderRepository.find({
      where: { persisted_at: MoreThan(since) },
      relations: [
        'items',
        'items.options',
        'customer',
        'merchant',
        'payments',
        'total',
      ],
    });
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
