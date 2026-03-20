import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailHeader from '@/features/store-staff/orders-management/components/OrderDetailHeader';
import OrderItemsCard from '@/features/store-staff/orders-management/components/OrderItemsCard';
import OrderSummaryCard from '@/features/store-staff/orders-management/components/OrderSummaryCard';
import { useOrdersManagement } from '../hooks';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: orders = [], isLoading } = useOrdersManagement();

  const order = useMemo(
    () => orders.find((item) => item.id === id),
    [id, orders]
  );

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-[var(--text-secondary)]">
        Đang tải chi tiết đơn hàng...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 text-sm text-[var(--text-secondary)]">
        Không tìm thấy đơn hàng
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <OrderDetailHeader order={order} />

      <div className="space-y-4 p-4">
        <OrderItemsCard items={order.items} />

        <OrderSummaryCard
          subtotal={order.subtotal}
          shippingFee={order.shippingFee}
          total={order.total}
          paymentMethod={order.paymentMethod}
          isPaid={order.isPaid}
          itemCount={order.items.length}
          orderType={order.orderType}
        />
      </div>
    </div>
  );
}
