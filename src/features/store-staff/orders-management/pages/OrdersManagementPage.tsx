import { useState } from 'react';
import OrdersManagementHeader from '../components/OrdersManagementHeader';
import OrderCard from '../components/OrderCard';
import ConfirmRejectModal from '../components/ConfirmRejectModal';
import type { Order } from '../types/order.type';

const mockOrders: Order[] = [
  {
    id: '123456',
    customerName: 'Nguyễn Văn B',
    phone: '0912345678',
    address: '123 Nguyễn Huệ, Q1',
    note: 'Giao nhanh giúp em',
    items: 2,
    subtotal: 39000,
    shippingFee: 15000,
    total: 54000,
    time: '5 phút trước',
    status: 'PENDING',
    isPaid: true,
  },
  {
    id: '123457',
    customerName: 'Trần Thị C',
    phone: '0909123456',
    address: '45 Lê Lợi, Q3',
    items: 1,
    subtotal: 50000,
    shippingFee: 15000,
    total: 65000,
    time: '10 phút trước',
    status: 'PREPARING',
    isPaid: true,
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [tab, setTab] = useState('PENDING');

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleAccept = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'PREPARING' } : o))
    );
  };

  const handleComplete = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'COMPLETED' } : o))
    );
  };

  const handleReject = (id: string) => {
    setSelectedOrderId(id);
    setRejectModalOpen(true);
  };

  const confirmReject = () => {
    if (!selectedOrderId) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrderId ? { ...o, status: 'REJECTED' } : o
      )
    );

    setRejectModalOpen(false);
    setSelectedOrderId(null);
  };

  const filtered =
    tab === 'ALL' ? orders : orders.filter((o) => o.status === tab);

  const counts = {
    PENDING: orders.filter((o) => o.status === 'PENDING').length,
    PREPARING: orders.filter((o) => o.status === 'PREPARING').length,
    COMPLETED: orders.filter((o) => o.status === 'COMPLETED').length,
    REJECTED: orders.filter((o) => o.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-10">
      <OrdersManagementHeader
        total={orders.length}
        activeTab={tab}
        counts={counts}
        onChangeTab={setTab}
      />

      <div className="mt-4 space-y-4 px-4">
        {filtered.length === 0 && (
          <div className="text-center text-gray-400">
            Hiện tại chưa có đơn hàng nào trong danh sách.
          </div>
        )}

        {filtered.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAccept={handleAccept}
            onReject={handleReject}
            onComplete={handleComplete}
          />
        ))}
      </div>

      <ConfirmRejectModal
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={confirmReject}
      />
    </div>
  );
}
