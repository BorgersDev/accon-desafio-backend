import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { HttpModule } from '@nestjs/axios';
import { IntegrationsController } from './integrations.controller';

@Module({
  imports: [HttpModule],
  providers: [IntegrationsService],
  exports: [IntegrationsService],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
