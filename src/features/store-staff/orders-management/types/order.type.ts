export type OrderStatus =
  | 'PENDING'
  | 'PREPARING'
  | 'PAID'
  | 'COMPLETED'
  | 'REJECTED';
export type OrderType = 'DELIVERY' | 'INSTORE';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  deliveryPhoneNumber?: string;
  address?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  time: string;
  status: OrderStatus;
  orderType: OrderType;
  paymentMethod: string;
  isPaid?: boolean;
  note?: string;
}
