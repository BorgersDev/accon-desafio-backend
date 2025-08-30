import { IOrderIntegrationAdapter } from './iorder-integration-adapter';
import { AcconOrderDto } from '../dto/accon-order.dto';
import { OpenDeliveryOrderDto } from '../dto/open-delivery-order.dto';

export class AcconOrderAdapter implements IOrderIntegrationAdapter {
  toOpenDelivery(externalOrder: AcconOrderDto): OpenDeliveryOrderDto {
    //TODO: Implement the transformation of AcconOrder to OpenDeliveryOrder
    return externalOrder as unknown as OpenDeliveryOrderDto;
  }
}
