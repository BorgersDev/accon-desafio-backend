export interface OpenDeliveryOrderDto {
  id: string;
  type: string;
  displayId: string;
  createdAt: string;
  orderTiming: string;
  preparationStartDateTime: string;
  merchant: {
    id: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
    documentNumber: string;
    email: string;
    phone: {
      number: string;
    };
    ordersCountOnMerchant: number;
  };
  items: Array<{
    id: string;
    externalCode: string;
    name: string;
    unit: string;
    quantity: number;
    unitPrice: {
      value: number;
      currency: string;
    };
    totalPrice: {
      value: number;
      currency: string;
    };
  }>;
  total: {
    subTotal: {
      value: number;
      currency: string;
    };
    deliveryFee: {
      value: number;
      currency: string;
    };
    otherFees: {
      value: number;
      currency: string;
    };
    discount: {
      value: number;
      currency: string;
    };
    orderAmount: {
      value: number;
      currency: string;
    };
  };
  payments: {
    prepaid: number;
    pending: number;
    methods: Array<{
      id: string;
      type: string;
      method: string;
      brand: string;
      value: number;
      currency: string;
    }>;
  };
}
