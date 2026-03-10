export interface OrderItem {
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  orderType: 'DELIVERY' | 'INSTORE';
  status: 'PENDING' | 'PAID' | 'PREPARING' | 'COMPLETED';
  deliveryOption?: 'ASAP' | 'SCHEDULED' | null;
  scheduledDeliveryAt?: string | null;
  orderDate: string;
  storeName: string;
  storeAddress?: string;
  deliveryAddress?: string;
  totalItems: number;
  totalPrice: number;
  storeId: string;
  items: OrderItem[];
}

export interface ProductAvailability {
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  available: boolean;
  stockQuantity: number;
}

export interface StoreRecommendation {
  storeId: string;
  storeName: string;
  address: string;
  distance: number | null;
  latitude: number | null;
  longitude: number | null;
  totalPrice: number;
  totalOriginalPrice: number;
  availableProducts: ProductAvailability[];
  unavailableProducts: string[];
  availabilityRate: number;
  recommendation: 'best' | 'good' | 'alternative';
}

export interface RepurchaseOrderRequest {
  orderId: string;
  userLatitude?: number;
  userLongitude?: number;
}

export interface RepurchaseOrderResponse {
  orderId: string;
  originalStoreName: string;
  productCount: number;
  storeRecommendations: StoreRecommendation[];
}

export interface ScanStoreResponse {
  orderId: string;
  storeId: string;
}

export interface RepurchaseToCartRequest {
  sourceOrderId: string;
  targetStoreId: string;
}

export interface RepurchaseToCartResponse {
  orderId: string;
  storeId: string;
  addedItemsCount: number;
  skippedItems: string[];
}
