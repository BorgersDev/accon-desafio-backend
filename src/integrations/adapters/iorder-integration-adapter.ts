import { OpenDeliveryOrderDto } from '../../orders/dto/open-delivery-order.dto';

export interface IOrderIntegrationAdapter {
  toOpenDelivery(externalOrder: any): OpenDeliveryOrderDto;
}
