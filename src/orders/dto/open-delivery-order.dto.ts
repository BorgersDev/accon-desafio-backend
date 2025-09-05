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
  delivery: {
    deliveredBy: string;
    deliveryAddress: {
      country: string;
      state: string;
      city: string;
      district: string;
      street: string;
      number: string;
      complement: string;
      referencePoint: string;
      formattedAddress: string;
      postalCode: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      estimatedDeliveryTime: string;
      deliveryDateTime: string;
      pickupCode: string;
    };
  };
  items: {
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
    options: {
      index: number;
      id: string;
      name: string;
      externalCode: string;
      unit: string;
      quantity: number;
      unitPrice: {
        value: number;
        currency: string;
      };
      originalPrice?: {
        value: number;
        currency: string;
      };
      subtotalPrice?: {
        value: number;
        currency: string;
      };
      totalPrice: {
        value: number;
        currency: string;
      };
      specialInstructions?: string;
    }[];
  }[];
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
    methods: {
      id: string;
      type: string;
      method: string;
      brand: string;
      value: number;
      currency: string;
    }[];
  };
  extraInfo: string;
}
