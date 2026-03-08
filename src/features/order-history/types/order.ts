export interface Order {
  id: string;
  type: 'STORE' | 'DELIVERY' | 'PICKUP';
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  orderDate: string;
  storeName: string;
  storeAddress?: string;
  deliveryAddress?: string;
  totalItems: number;
  totalPrice: number;
}
