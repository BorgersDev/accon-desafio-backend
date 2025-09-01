import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OpenDeliveryOrderDto } from './dto/open-delivery-order.dto';
import { mapDtoToOrderEntity } from './mappers/order.mapper';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() orderDto: OpenDeliveryOrderDto) {
    const orderEntity = mapDtoToOrderEntity(orderDto);
    return this.ordersService.create(orderEntity);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(id);
    return { message: 'Order deleted successfully', id };
  }
}
