export interface ExternalOrderDto {
  _id: string;
  delivery: boolean;
  canceled: boolean;
  scheduled: boolean;
  network: string;
  sequential: number;
  store: {
    _id: string;
    name: string;
    address: {
      zip: string;
      state: string;
      city: string;
      address: string;
      number: string;
      complement: string;
      district: string;
      name: string;
      is_active: boolean;
      created_at: string;
      latlng: {
        lat: number;
        lng: number;
      };
    };
    deliveryTime: string;
    toGoTime: string;
    details: {
      whatsapp: {
        is_active: boolean;
      };
      email: string;
      phone: string;
      socialName: string;
      storePhone: string;
      document: string;
    };
  };
  user: {
    _id: string;
    name: string;
    document: string;
    email: string;
    phone: string;
    totalOrders: number;
  };
  address: {
    zip: string;
    state: string;
    city: string;
    address: string;
    number: string;
    complement: string;
    district: string;
    name: string;
    is_active: boolean;
    created_at: string;
    latlng: {
      lat: number;
      lng: number;
    };
  };
  discount: number;
  subtotal: number;
  deliveryTax: number;
  date: string;
  voucher: {
    _id: string;
    stores: string[];
    fidelity: boolean;
    products: any[];
    percent: boolean;
    usage: number;
    recurrent: boolean;
    usagePerUser: number;
    firstOrder: boolean;
    on_list: boolean;
    is_active: boolean;
    name: string;
    text: string;
    value: number;
    quantity: number;
    type: string;
    rules: string;
    start_at: string;
    expires_at: string;
    rede: string;
    time: {
      _id: string;
      dayOfWeek: number;
      start: string;
      end: string;
    }[];
    created_at: string;
    updated_at: string;
    filed: boolean;
    minOrderValue: number;
  };
  notes: string;
  document: string;
  ip: string;
  change: number;
  source: string;
  status: {
    _id: string;
    name: string;
    date: string;
  }[];
  total: number;
  payment: {
    online: boolean;
    name: string;
    cod: string;
    externalVendorCode: string;
  };
  products: {
    id: string;
    name: string;
    quantity: number;
    modifiers: {
      id: string;
      name: string;
      price: {
        actualPrice: number;
        originalPrice: number;
        starterPrice: number;
      };
      quantity: number;
      group: string;
    }[];
    rating: {
      improvements: any[];
    };
    externalVendors: {
      status: any[];
    };
    externalDelivery: {
      status: any[];
    };
    notes: string;
    total: number;
  }[];
}
