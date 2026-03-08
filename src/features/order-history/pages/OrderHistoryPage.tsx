import React, { useState } from 'react';
import AppHeader from '@/shared/components/common/Header';
import OrderCard from '../components/OrderCard';
import OrderEmptyState from '../components/OrderEmptyState';
import { type Order } from '../types/order';

// MOCK DATA
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    type: 'STORE',
    status: 'COMPLETED',
    orderDate: '2025-12-27 15:20',
    storeName: 'CircleK - Nguyễn Huệ',
    totalItems: 2,
    totalPrice: 39000,
  },
  {
    id: 'ORD-002',
    type: 'DELIVERY',
    status: 'COMPLETED',
    orderDate: '2025-12-26 12:45',
    storeName: 'FamilyMart - Lê Lợi',
    deliveryAddress: '123 Nguyễn Văn Linh, Quận 7',
    totalItems: 1,
    totalPrice: 26500,
  },
  {
    id: 'ORD-003',
    type: 'PICKUP',
    status: 'COMPLETED',
    orderDate: '2025-12-25 18:30',
    storeName: 'CircleK - Hai Bà Trưng',
    totalItems: 2,
    totalPrice: 45000,
  },
];

export default function OrderHistoryPage() {
  const [orders] = useState<Order[]>(mockOrders);

  const handleCardClick = () => {};

  const handleRepurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] pb-20">
      <AppHeader title="Lịch sử đơn hàng" showBack={true} />
      <main className="flex-1 p-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={handleCardClick}
              onRepurchase={handleRepurchase}
            />
          ))
        ) : (
          <OrderEmptyState />
        )}
      </main>
    </div>
  );
}
