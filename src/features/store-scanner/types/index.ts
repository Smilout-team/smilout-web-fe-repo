export interface ScanStoreRequest {
  storeId: string;
}

export interface ScanStoreResponse {
  orderId: string;
  storeId: string;
  orderType: 'INSTORE';
  status: 'PENDING';
  totalAmount: number;
}

export interface NearbyStore {
  storeId: string;
  storeName: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}
