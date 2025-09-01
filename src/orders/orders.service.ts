import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async persistOrders(dtos: OpenDeliveryOrderDto[]): Promise<void> {
    for (const dto of dtos) {
      const orderEntity = mapDtoToOrderEntity(dto);
      await this.create(orderEntity);
    }
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
