import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { HttpModule } from '@nestjs/axios';
import { IntegrationsController } from './integrations.controller';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [HttpModule, OrdersModule],
  providers: [IntegrationsService],
  exports: [IntegrationsService],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
