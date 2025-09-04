import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
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

  @Get('/dashboard/partial')
  async getOrdersPartial(@Res() res: Response) {
    const orders = await this.appService.getDashboardOrders();
    res.render('partials/orders-list', { orders });
  }
}
