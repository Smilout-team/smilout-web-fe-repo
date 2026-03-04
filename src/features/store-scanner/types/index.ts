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

export interface ActiveStoreSession {
  storeId: string;
  orderId: string;
}

export interface StoreDetail {
  id: string;
  storeName: string;
  address: string;
  contactPhone: string;
  avatarKey: string;
}
