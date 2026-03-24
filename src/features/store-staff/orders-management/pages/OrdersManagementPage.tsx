import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import OrdersManagementHeader from '../components/OrdersManagementHeader';
import OrderCard from '../components/OrderCard';
import ConfirmRejectModal from '../components/ConfirmRejectModal';
import { useOrdersManagement } from '../hooks';
import {
  ordersManagementService,
  type BackendOrder,
  type BackendOrderItem,
} from '../services/ordersManagementService';
import type { OrderStatus } from '../types/order.type';

import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/core/configs/firebase';
import { useAuth } from '@/shared/hooks/useAuth';
import { mapBackendOrderToFrontend } from '../services/ordersManagementService';

export default function OrdersPage() {
  const { user } = useAuth();
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
  const [realtimeOrders, setRealtimeOrders] = useState<BackendOrder[]>([]);

  const mergedOrders = useMemo(() => {
    const realtimeIds = new Set(realtimeOrders.map((order) => order.id));
    const filteredOrders = orders.filter((order) => !realtimeIds.has(order.id));
    const allOrders = [
      ...realtimeOrders.map(mapBackendOrderToFrontend),
      ...filteredOrders,
    ];
    return allOrders.map((order) => {
      const overriddenStatus = statusOverrides[order.id];
      return overriddenStatus ? { ...order, status: overriddenStatus } : order;
    });
  }, [realtimeOrders, orders, statusOverrides]);

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
        ? mergedOrders.filter((o) => o.status === 'PAID')
        : mergedOrders.filter((o) => o.status === tab);

  const counts = {
    PENDING: mergedOrders.filter((o) => o.status === 'PAID').length,
    PREPARING: mergedOrders.filter((o) => o.status === 'PREPARING').length,
    COMPLETED: mergedOrders.filter((o) => o.status === 'COMPLETED').length,
    REJECTED: mergedOrders.filter((o) => o.status === 'REJECTED').length,
  };

  useEffect(() => {
    const q = query(collection(db, 'order_events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const data = change.doc.data();
        if (change.type === 'added') {
          if (
            data.type === 'order_new' &&
            data.order.storeId === user?.store?.id
          ) {
            toast.info(`Đơn hàng mới từ ${data.order.consumer.name}`);
            setRealtimeOrders((prev) => [
              {
                id: data.order.id,
                orderType: data.order.orderType,
                status: data.order.status,
                deliveryAddress: data.order.deliveryAddress,
                deliveryPhoneNumber: data.order.deliveryPhoneNumber,
                deliveryOption: data.order.deliveryOption,
                scheduledDeliveryAt: data.order.scheduledDeliveryAt,
                createdAt: data.order.createdAt,
                totalAmount: data.order.totalAmount,
                consumer: data.order.consumer,

                items: data.order.orderItems.map((item: BackendOrderItem) => ({
                  id: item.id,
                  productName: item.productName,
                  priceAtPurchase: Number(item.priceAtPurchase),
                  quantity: item.quantity,
                  imageUrls: item.imageUrls,
                })),
              },
              ...prev,
            ]);
            await deleteDoc(doc(db, 'order_events', change.doc.id));
          }
        }
      });
    });
    return () => unsubscribe();
  }, [user?.store?.id]);

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
