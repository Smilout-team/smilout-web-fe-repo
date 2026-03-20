import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/shared/components/common/Header';
import OrderCard from '../components/OrderCard';
import OrderEmptyState from '../components/OrderEmptyState';
import { useOrderHistory } from '../hooks';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrderHistory();

  const handleRepurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const formatOrderDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const mappedOrders = orders.map((order) => ({
    ...order,
    orderDate: formatOrderDate(order.orderDate),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] pb-20">
      <AppHeader title="Lịch sử đơn hàng" showBack={true} />
      <main className="flex-1 p-4">
        {isLoading ? (
          <div className="py-8 text-center text-[var(--text-secondary)]">
            Đang tải lịch sử đơn hàng...
          </div>
        ) : mappedOrders.length > 0 ? (
          mappedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onRepurchase={(e) => {
                handleRepurchase(e);
                navigate(`/orders/${order.id}/repurchase`);
              }}
            />
          ))
        ) : (
          <OrderEmptyState />
        )}
      </main>
    </div>
  );
}
