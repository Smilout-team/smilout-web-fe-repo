export interface ProcessPaymentRequest {
  orderId: string;
  deliveryAddress?: string;
  deliveryOption?: 'ASAP' | 'SCHEDULED';
  scheduledDeliveryAt?: string;
  deliveryPhoneNumber?: string;
  userLatitude?: number;
  userLongitude?: number;
}

export interface DeliveryAddressOption {
  id: string;
  label: string;
  address: string;
  fullAddress?: string;
  source: 'COORDINATE' | 'PROFILE' | 'GOONG';
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface ProcessPaymentResponse {
  orderId: string;
  storeId: string;
  status: 'PAID' | 'PREPARING';
  deliveryAddress: string | null;
  deliveryOption: 'ASAP' | 'SCHEDULED' | null;
  scheduledDeliveryAt: string | null;
  subtotalAmount: number;
  deliveryFee: number;
  distanceKm: number | null;
  totalAmount: number;
}
