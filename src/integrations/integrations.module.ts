import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdersModule } from 'src/orders/orders.module';

import { IntegrationsController } from './integrations.controller';

import { IntegrationsService } from './integrations.service';
import { OrderSyncService } from './order-sync/order-sync.service';

@Module({
  imports: [HttpModule, OrdersModule],
  providers: [IntegrationsService, OrderSyncService],
  exports: [IntegrationsService],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
