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

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrls: string[];
  description: string;
  stockQuantity: number;
  expiryDate: string | null;
  category: string;
}
