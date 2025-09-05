// DTO-style mock for controller/service tests
export const mockOrderDto = {
  id: '1',
  type: 'DELIVERY',
  displayId: '123',
  createdAt: new Date('2024-01-01T00:00:00.000Z').toISOString(),
  orderTiming: 'INSTANT',
  preparationStartDateTime: new Date('2024-01-01T00:05:00.000Z').toISOString(),
  extraInfo: '',
  merchant: { id: 'm1', name: 'Store' },
  customer: {
    id: 'c1',
    name: 'Customer',
    documentNumber: '123',
    email: 'a@a.com',
    phone: { number: '999' },
    ordersCountOnMerchant: 1,
  },
  items: [],
  total: {
    subTotal: { value: 10, currency: 'BRL' },
    deliveryFee: { value: 0, currency: 'BRL' },
    otherFees: { value: 0, currency: 'BRL' },
    discount: { value: 0, currency: 'BRL' },
    orderAmount: { value: 10, currency: 'BRL' },
  },
  payments: {
    prepaid: 0,
    pending: 10,
    methods: [
      {
        id: 'p1',
        type: 'PENDING',
        method: 'CASH',
        brand: '',
        value: 10,
        currency: 'BRL',
      },
    ],
  },
  delivery: {
    deliveredBy: 'MERCHANT',
    deliveryAddress: {
      country: 'BR',
      state: 'SP',
      city: 'São Paulo',
      district: 'Centro',
      street: 'Rua Exemplo',
      number: '100',
      complement: '',
      referencePoint: '',
      formattedAddress: 'Rua Exemplo, 100, Centro, São Paulo - SP',
      postalCode: '01000-000',
      coordinates: { latitude: -23.5, longitude: -46.6 },
      estimatedDeliveryTime: new Date('2024-01-01T01:00:00.000Z').toISOString(),
      deliveryDateTime: new Date('2024-01-01T01:30:00.000Z').toISOString(),
      pickupCode: '',
    },
  },
};
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../orders/entities/customer.entity';
import { Item } from '../orders/entities/item.entity';
import { PaymentMethod } from '../orders/entities/payment-method.entity';
import { OrderTotal } from '../orders/entities/order-total.entity';
import { Merchant } from '../orders/entities/merchant.entity';
import { mockDelivery } from './delivery.mock';

export const mockCustomer: Customer = {
  id: 'customer-id',
  name: 'John Doe',
  document_number: '12345678900',
  email: 'john@example.com',
  phone: '999',
  orders_count: 1,
  orders: [],
};

export const mockItem: Item = {
  id: 'item-id',
  order: {} as Order,
  external_code: 'EXT-123',
  name: 'Pizza',
  unit: 'unit',
  quantity: 1,
  unit_price: 50,
  total_price: 50,
  currency: 'USD',
  options: [],
};

export const mockPaymentMethod: PaymentMethod = {
  id: 'pay-id',
  order: {} as Order,
  type: 'CASH',
  method: 'CASH',
  brand: 'N/A',
  value: 50,
  currency: 'USD',
};

export const mockOrderTotal: OrderTotal = {
  order_id: 'order-id',
  order: {} as Order,
  subtotal: 50,
  delivery_fee: 5,
  other_fees: 0,
  discount: 5,
  order_amount: 50,
  currency: 'USD',
};

export const mockOrder: Order = {
  id: 'order-id',
  merchant: {} as Merchant,
  customer: mockCustomer,
  type: 'DELIVERY',
  display_id: 'D-123',
  created_at: new Date('2024-01-01T00:00:00.000Z'),
  persisted_at: new Date(),
  order_timing: 'ASAP',
  preparation_start: new Date('2024-01-01T00:05:00.000Z'),
  extra_info: '',
  total: mockOrderTotal,
  payments: [mockPaymentMethod],
  items: [mockItem],
  delivery: mockDelivery,
};

export const mockOrderArray: Order[] = [mockOrder];
