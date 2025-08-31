import { IOrderIntegrationAdapter } from './iorder-integration-adapter';
import { AcconOrderDto } from '../dto/accon-order.dto';
import { OpenDeliveryOrderDto } from '../dto/open-delivery-order.dto';
import { v4 as uuidv4 } from 'uuid';

function mapPaymentMethod(acconMethod: string): {
  method: string;
  brand: string;
} {
  if (!acconMethod) return { method: '', brand: '' };

  if (acconMethod.toUpperCase().includes('DINHEIRO')) {
    return { method: 'CASH', brand: '' };
  }
  if (acconMethod.toUpperCase().includes('DÉBITO')) {
    const brand = acconMethod.split(' ')[2]?.trim().toUpperCase() || '';
    return { method: 'DEBIT', brand };
  }
  if (acconMethod.toUpperCase().includes('CRÉDITO')) {
    const brand = acconMethod.split(' ')[2]?.trim().toUpperCase() || '';
    return { method: 'CREDIT', brand };
  }
  return { method: acconMethod, brand: '' };
}

export class AcconOrderAdapter implements IOrderIntegrationAdapter {
  toOpenDelivery(externalOrder: AcconOrderDto): OpenDeliveryOrderDto {
    const paymentInfo = mapPaymentMethod(externalOrder.payment?.name);

    // Required properties validation
    if (!externalOrder._id) throw new Error('must have required property ID');
    if (!externalOrder.store?.name)
      throw new Error('must have required property store name');
    if (!externalOrder.user?.name)
      throw new Error('must have required property user name');
    if (!externalOrder.products || externalOrder.products.length === 0)
      throw new Error('must have require property Items');
    if (!externalOrder.total)
      throw new Error('must have required property total');

    return {
      id: uuidv4(),
      type: externalOrder.delivery ? 'DELIVERY' : 'TAKEOUT',
      displayId: String(externalOrder.sequential),
      createdAt: externalOrder.date,
      orderTiming: externalOrder.scheduled ? 'SCHEDULED' : 'INSTANT',
      preparationStartDateTime: externalOrder.date, // NOT SURE YET
      merchant: {
        id: uuidv4(),
        name: externalOrder.store.name,
      },
      customer: {
        id: uuidv4(),
        name: externalOrder.user.name,
        documentNumber: externalOrder.user.document,
        email: externalOrder.user.email,
        phone: {
          number: externalOrder.user.phone,
        },
        ordersCountOnMerchant: externalOrder.user?.totalOrders,
      },
      items:
        externalOrder.products?.map((product) => ({
          id: uuidv4(),
          externalCode: product.id,
          name: product.name,
          unit: 'UNIT', // NOT SURE YET
          quantity: product.quantity,
          unitPrice: {
            value: product.total,
            currency: 'BRL',
          },
          totalPrice: {
            value: product.total,
            currency: 'BRL',
          },
          options: product.modifiers?.map((modifier, idx) => ({
            index: idx,
            id: uuidv4(),
            name: modifier.name,
            externalCode: modifier.id,
            unit: 'UNIT', // NOT SURE YET
            quantity: modifier.quantity,
            unitPrice: {
              value: modifier.price.actualPrice,
              currency: 'BRL',
            },
            originalPrice: {
              value: modifier.price.originalPrice,
              currency: 'BRL',
            },
            subtotalPrice: {
              value: modifier.price.actualPrice * modifier.quantity,
              currency: 'BRL',
            },
            totalPrice: {
              value: modifier.price.actualPrice * modifier.quantity,
              currency: 'BRL',
            },
          })),
        })) ?? [],
      total: {
        subTotal: {
          value: externalOrder.subtotal,
          currency: 'BRL',
        },
        deliveryFee: {
          value: externalOrder.deliveryTax,
          currency: 'BRL',
        },
        otherFees: {
          value: 0,
          currency: 'BRL',
        },
        discount: {
          value: externalOrder.discount,
          currency: 'BRL',
        },
        orderAmount: {
          value: externalOrder.total,
          currency: 'BRL',
        },
      },
      payments: {
        prepaid: 0, // NOT SURE YET
        pending: externalOrder.total,
        methods: [
          {
            id: externalOrder.payment.cod,
            type: externalOrder.payment?.online ? 'PREPAID' : 'PENDING',
            method: paymentInfo.method,
            brand: paymentInfo.brand,
            value: externalOrder.total,
            currency: 'BRL',
          },
        ],
      },
      extraInfo: externalOrder.notes || '',
    };
  }
}
