import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import OrdersManagementHeader from '../components/OrdersManagementHeader';
import OrderCard from '../components/OrderCard';
import ConfirmRejectModal from '../components/ConfirmRejectModal';
import { useOrdersManagement } from '../hooks';
import { ordersManagementService } from '../services/ordersManagementService';
import type { OrderStatus } from '../types/order.type';

export default function OrdersPage() {
  const statusFromQuery = new URLSearchParams(window.location.search)
    .get('status')
    ?.toUpperCase();
  const { data: orders = [], isLoading } = useOrdersManagement();
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, OrderStatus>
  >({});
  const [tab, setTab] = useState(statusFromQuery || 'PENDING');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const mergedOrders = useMemo(
    () =>
      orders.map((order) => {
        const overriddenStatus = statusOverrides[order.id];

        if (!overriddenStatus) {
          return order;
        }

        return {
          ...order,
          status: overriddenStatus,
        };
      }),
    [orders, statusOverrides]
  );

  const handleAccept = async (id: string) => {
    try {
      await ordersManagementService.acceptOrder(id);
      setStatusOverrides((prev) => ({
        ...prev,
        [id]: 'PREPARING',
      }));
      toast.success('Đã xác nhận đơn hàng');
    } catch (_error) {
      toast.error('Không thể xác nhận đơn hàng');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await ordersManagementService.completeOrder(id);
      setStatusOverrides((prev) => ({
        ...prev,
        [id]: 'COMPLETED',
      }));
      toast.success('Đã hoàn thành đơn hàng');
    } catch (_error) {
      toast.error('Không thể hoàn thành đơn hàng');
    }
  };

  const handleReject = (id: string) => {
    setSelectedOrderId(id);
    setRejectModalOpen(true);
  };

  const confirmReject = async () => {
    if (!selectedOrderId) {
      return;
    }

    try {
      await ordersManagementService.rejectOrder(selectedOrderId);
      setStatusOverrides((prev) => ({
        ...prev,
        [selectedOrderId]: 'REJECTED',
      }));
      toast.success('Đã từ chối đơn hàng');
    } catch (_error) {
      toast.error('Không thể từ chối đơn hàng');
    }

    setRejectModalOpen(false);
    setSelectedOrderId(null);
  };

  const filtered =
    tab === 'ALL'
      ? mergedOrders
      : tab === 'PENDING'
        ? mergedOrders.filter(
            (o) => o.status === 'PENDING' || o.status === 'PAID'
          )
        : mergedOrders.filter((o) => o.status === tab);

  const counts = {
    PENDING: mergedOrders.filter(
      (o) => o.status === 'PENDING' || o.status === 'PAID'
    ).length,
    PREPARING: mergedOrders.filter((o) => o.status === 'PREPARING').length,
    COMPLETED: mergedOrders.filter((o) => o.status === 'COMPLETED').length,
    REJECTED: mergedOrders.filter((o) => o.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-10">
      <OrdersManagementHeader
        total={mergedOrders.length}
        activeTab={tab}
        counts={counts}
        onChangeTab={setTab}
      />

      <div className="mt-4 space-y-4 px-4">
        {isLoading && (
          <div className="text-center text-gray-400">Đang tải đơn hàng...</div>
        )}

        {!isLoading && filtered.length === 0 && (
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
