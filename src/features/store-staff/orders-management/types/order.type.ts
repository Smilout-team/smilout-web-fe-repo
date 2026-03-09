export type OrderStatus = 'PENDING' | 'PREPARING' | 'COMPLETED' | 'REJECTED';

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
  address?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  time: string;
  status: OrderStatus;
  paymentMethod: string;
  isPaid?: boolean;
  note?: string;
}
