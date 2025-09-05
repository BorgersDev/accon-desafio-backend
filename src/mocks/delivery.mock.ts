import { Delivery } from '../orders/entities/delivery.entity';

export const mockDelivery: Delivery = {
  id: 'delivery-id',
  order: undefined as any, // será atribuído pelo mockOrder
  delivered_by: 'MERCHANT',
  estimated_delivery_date_time: '2024-01-01T01:00:00.000Z',
  delivery_date_time: '2024-01-01T01:30:00.000Z',
  pickup_code: 'ABC123',
  country: 'BR',
  state: 'SP',
  city: 'São Paulo',
  district: 'Centro',
  street: 'Rua Exemplo',
  number: '100',
  complement: 'Apto 10',
  reference_point: 'Próximo à praça',
  formatted_address: 'Rua Exemplo, 100, Centro, São Paulo - SP',
  postal_code: '01000-000',
  latitude: -23.55052,
  longitude: -46.633308,
};
