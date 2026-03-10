import Tag from '@/shared/components/common/Tag';
import type { OrderStatus } from '../types/order.type';

import {
  Clock,
  ChefHat,
  CheckCircle2,
  XCircle,
  DollarSign,
} from 'lucide-react';

export default function OrderStatusTag({ status }: { status: OrderStatus }) {
  switch (status) {
    case 'PENDING':
      return (
        <Tag tone="primary" icon={<Clock />}>
          Chờ xác nhận
        </Tag>
      );

    case 'PREPARING':
      return (
        <Tag tone="blue" icon={<ChefHat />}>
          Đang chuẩn bị
        </Tag>
      );

    case 'PAID':
      return (
        <Tag tone="green" icon={<DollarSign />}>
          Đã thanh toán
        </Tag>
      );

    case 'COMPLETED':
      return (
        <Tag tone="green" icon={<CheckCircle2 />}>
          Đã hoàn thành
        </Tag>
      );

    case 'REJECTED':
      return (
        <Tag tone="red" icon={<XCircle />}>
          Đã từ chối
        </Tag>
      );
  }
}
