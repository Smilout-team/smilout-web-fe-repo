import { MapPin, Phone, ClipboardList, Eye, X, Check } from 'lucide-react';

import Button from '@/shared/components/common/Button';
import Tag from '@/shared/components/common/Tag';
import OrderStatusTag from './OrderStatusTag';
import type { Order } from '../types/order.type';
import { useNavigate } from 'react-router-dom';

interface Props {
  order: Order;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onComplete: (id: string) => void;
}

export default function OrderCard({
  order,
  onAccept,
  onReject,
  onComplete,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-semibold text-[var(--color-primary)]">
            {order.customerName.charAt(0)}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {order.customerName}
            </p>

            <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <Phone size={12} />
              {order.phone}
            </p>

            <p className="text-xs text-[var(--text-muted)]">
              #{order.id} • {order.time}
            </p>
          </div>
        </div>

        <OrderStatusTag status={order.status} />
      </div>

      {order.address && (
        <div className="space-y-1 rounded-[var(--radius-md)] bg-[var(--bg-muted)] p-3">
          <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <MapPin size={12} />
            Địa chỉ giao hàng
          </div>

          <div className="text-sm text-[var(--text-primary)]">
            {order.address}
          </div>
        </div>
      )}

      <div className="space-y-1 rounded-[var(--radius-md)] border border-yellow-200 bg-yellow-50 p-3">
        <div className="flex items-center gap-1 text-xs text-yellow-600">
          <ClipboardList size={12} />
          Ghi chú
        </div>

        <div className="text-sm text-[var(--text-primary)]">
          {order.note || 'Không có ghi chú nào từ khách hàng'}
        </div>
      </div>

      <button
        onClick={() => navigate(`/store-staff/orders/${order.id}`)}
        className="flex items-center gap-1 text-sm text-[var(--color-primary)]"
      >
        <Eye size={14} />
        Xem chi tiết ({order.items} sản phẩm)
      </button>

      <div className="space-y-2 border-t border-b border-[var(--border-default)] py-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính</span>
          <span>{order.subtotal.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Phí giao hàng</span>
          <span>{order.shippingFee.toLocaleString()}đ</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-[var(--color-primary)]">
        <span>Tổng cộng</span>

        <span>{order.total.toLocaleString()}đ</span>
      </div>

      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span>Thanh toán: Ví SMILOUT</span>

        {order.isPaid && (
          <Tag tone="green" variant="light" size="sm">
            Đã thanh toán
          </Tag>
        )}
      </div>

      {order.status === 'PENDING' && (
        <div className="flex gap-3">
          <Button
            variant="secondary"
            fullWidth
            leftIcon={<X size={16} />}
            onClick={() => onReject(order.id)}
          >
            Từ chối
          </Button>

          <Button
            variant="primary"
            fullWidth
            leftIcon={<Check size={16} />}
            onClick={() => onAccept(order.id)}
          >
            Chấp nhận
          </Button>
        </div>
      )}

      {order.status === 'PREPARING' && (
        <Button
          variant="success"
          fullWidth
          leftIcon={<Check size={16} />}
          onClick={() => onComplete(order.id)}
        >
          Hoàn thành đơn hàng
        </Button>
      )}
    </div>
  );
}
