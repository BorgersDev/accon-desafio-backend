import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async dashboard() {
    const orders = await this.appService.getDashboardOrders();
    return { orders };
  }
}
