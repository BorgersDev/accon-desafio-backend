import { IOrderIntegrationAdapter } from './iorder-integration-adapter';
import { AcconOrderDto } from '../dto/accon-order.dto';
import { OpenDeliveryOrderDto } from '../../orders/dto/open-delivery-order.dto';
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

    const missingFields: string[] = [];
    if (!externalOrder._id) missingFields.push('ID');
    if (!externalOrder.store?.name) missingFields.push('store name');
    if (!externalOrder.user?.name) missingFields.push('user name');
    if (!externalOrder.products || externalOrder.products.length === 0)
      missingFields.push('Items');
    if (!externalOrder.total) missingFields.push('total');

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required properties: ${missingFields.join(', ')}`,
      );
    }

    return {
      id: uuidv4(),
      type: externalOrder.delivery ? 'DELIVERY' : 'TAKEOUT',
      displayId: String(externalOrder.sequential),
      createdAt: externalOrder.date,
      orderTiming: externalOrder.scheduled ? 'SCHEDULED' : 'INSTANT',
      preparationStartDateTime: externalOrder.date,
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
      delivery: {
        deliveredBy: 'MERCHANT',
        deliveryAddress: {
          country: 'BR',
          state: externalOrder.address?.state,
          city: externalOrder.address?.city,
          district: externalOrder.address?.district,
          street: externalOrder.address?.address,
          number: externalOrder.address?.number,
          complement: externalOrder.address?.complement,
          referencePoint: '',
          formattedAddress: `${externalOrder.address?.address || ''} ${externalOrder.address?.number || ''} - ${externalOrder.address?.district || ''}, ${externalOrder.address?.city || ''} - ${externalOrder.address?.state || ''}`,
          postalCode: externalOrder.address?.zip,
          coordinates: {
            latitude: externalOrder.address?.latlng?.lat || 0,
            longitude: externalOrder.address?.latlng?.lng || 0,
          },
          estimatedDeliveryTime: externalOrder.store?.deliveryTime
            ? new Date(
                Date.parse(externalOrder.date) +
                  Number(externalOrder.store.deliveryTime) * 60000,
              ).toISOString()
            : new Date(externalOrder.date).toISOString(),
          deliveryDateTime: externalOrder.address?.created_at || '',
          pickupCode: '',
        },
      },
      items:
        externalOrder.products?.map((product) => ({
          id: uuidv4(),
          externalCode: product.id,
          name: product.name,
          unit: 'UNIT',
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
            unit: 'UNIT',
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
        prepaid: 0,
        pending: externalOrder.total,
        methods: [
          {
            id: uuidv4(),
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
