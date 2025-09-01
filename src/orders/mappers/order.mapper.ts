import { OpenDeliveryOrderDto } from '../dto/open-delivery-order.dto';

export function mapDtoToOrderEntity(dto: OpenDeliveryOrderDto): Partial<any> {
  return {
    // Campos principais
    id: dto.id,
    type: dto.type,
    display_id: dto.displayId,
    created_at: new Date(dto.createdAt),
    order_timing: dto.orderTiming,
    preparation_start: new Date(dto.preparationStartDateTime),
    extra_info: dto.extraInfo,

    // Merchant
    merchant: {
      id: dto.merchant.id,
      name: dto.merchant.name,
    },

    // Customer
    customer: {
      id: dto.customer.id,
      name: dto.customer.name,
      document_number: dto.customer.documentNumber,
      email: dto.customer.email,
      phone: dto.customer.phone?.number,
      orders_count: dto.customer.ordersCountOnMerchant,
    },

    // Items
    items: dto.items.map((itemDto) => ({
      id: itemDto.id,
      external_code: itemDto.externalCode,
      name: itemDto.name,
      unit: itemDto.unit,
      quantity: itemDto.quantity,
      unit_price: itemDto.unitPrice.value,
      total_price: itemDto.totalPrice.value,
      currency: itemDto.totalPrice.currency,
      options:
        itemDto.options?.map((optionDto) => ({
          index: optionDto.index,
          id: optionDto.id,
          name: optionDto.name,
          external_code: optionDto.externalCode,
          unit: optionDto.unit,
          quantity: optionDto.quantity,
          unit_price: optionDto.unitPrice.value,
          original_price: optionDto.originalPrice?.value ?? null,
          subtotal_price: optionDto.subtotalPrice?.value ?? null,
          total_price: optionDto.totalPrice.value,
          currency: optionDto.totalPrice.currency,
          special_instructions: optionDto.specialInstructions ?? null,
        })) || [],
    })),

    // Total
    total: {
      sub_total: dto.total.subTotal.value,
      delivery_fee: dto.total.deliveryFee.value,
      other_fees: dto.total.otherFees.value,
      discount: dto.total.discount.value,
      order_amount: dto.total.orderAmount.value,
      currency: dto.total.orderAmount.currency,
    },

    // Payments
    payments: dto.payments.methods.map((method) => ({
      id: method.id,
      type: method.type,
      method: method.method,
      brand: method.brand,
      value: method.value,
      currency: method.currency,
    })),

    prepaid: dto.payments.prepaid,
    pending: dto.payments.pending,
  };
}
