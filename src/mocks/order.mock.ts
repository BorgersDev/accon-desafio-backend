import { Order } from '../orders/entities/order.entity';
import { Customer } from '../orders/entities/customer.entity';
import { Item } from '../orders/entities/item.entity';
import { PaymentMethod } from '../orders/entities/payment-method.entity';
import { OrderTotal } from '../orders/entities/order-total.entity';
import { Merchant } from '../orders/entities/merchant.entity';

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
};

export const mockOrderArray: Order[] = [mockOrder];
