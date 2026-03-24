import Tag from '@/shared/components/common/Tag';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from '@/core/configs/firebase';
import type { OrderStatus } from '@/features/store-staff/orders-management/types/order.type';
import { useEffect, useState } from 'react';

interface OrderStatusBadgeProps {
  orderType: 'DELIVERY' | 'INSTORE';
  status: 'PENDING' | 'PAID' | 'PREPARING' | 'COMPLETED';
  orderId: string;
}

export default function OrderStatusBadge({
  orderType,
  status,
  orderId,
}: OrderStatusBadgeProps) {
  const [realtimeOrderStatus, setRealtimeOrderStatus] =
    useState<OrderStatus>(status);
  useEffect(() => {
    const q = query(collection(db, 'order_events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const data = change.doc.data();
        if (change.type === 'added') {
          if (data.type === 'order_update' && data.orderId == orderId) {
            setRealtimeOrderStatus(data.status);
            await deleteDoc(doc(db, 'order_events', change.doc.id));
          }
        }
      });
    });
    return () => unsubscribe();
  }, [orderId]);

  if (realtimeOrderStatus === 'PAID') {
    if (orderType === 'DELIVERY') {
      return (
        <Tag tone="primary" variant="light" rounded="full" size="sm">
          Chờ xác nhận
        </Tag>
      );
    }

    return (
      <Tag tone="green" variant="light" rounded="full" size="sm">
        Hoàn thành
      </Tag>
    );
  }

  if (realtimeOrderStatus === 'PREPARING') {
    return (
      <Tag tone="blue" variant="light" rounded="full" size="sm">
        Đang chuẩn bị
      </Tag>
    );
  }

  if (realtimeOrderStatus === 'COMPLETED') {
    return (
      <Tag tone="green" variant="light" rounded="full" size="sm">
        Hoàn thành
      </Tag>
    );
  }

  return (
    <Tag tone="gray" variant="light" rounded="full" size="sm">
      Chờ thanh toán
    </Tag>
  );
}
