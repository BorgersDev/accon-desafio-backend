import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';
import { Merchant } from './entities/merchant.entity';
import { Customer } from './entities/customer.entity';
import { OrderTotal } from './entities/order-total.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Item } from './entities/item.entity';
import { ItemOption } from './entities/item-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Merchant,
      Customer,
      OrderTotal,
      PaymentMethod,
      Item,
      ItemOption,
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
