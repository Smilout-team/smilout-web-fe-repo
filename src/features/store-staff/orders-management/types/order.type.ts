export type OrderStatus = 'PENDING' | 'PREPARING' | 'COMPLETED' | 'REJECTED';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  items: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  time: string;
  status: OrderStatus;

  isPaid?: boolean;
  note?: string;
}
