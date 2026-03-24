import Tag from '@/shared/components/common/Tag';
import type { OrderType } from '../types/order.type';

interface Props {
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  isPaid?: boolean;
  itemCount: number;
  orderType: OrderType;
}

export default function OrderSummaryCard({
  subtotal,
  shippingFee,
  total,
  paymentMethod,
  isPaid,
  itemCount,
  orderType,
}: Props) {
  return (
    <div className="space-y-3 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
      <div className="flex justify-between text-sm text-[var(--text-secondary)]">
        <span>Tạm tính ({itemCount} món)</span>
        <span>{subtotal.toLocaleString()}đ</span>
      </div>

      {orderType === 'DELIVERY' && (
        <div className="flex justify-between text-sm text-[var(--text-secondary)]">
          <span>Phí giao hàng</span>
          <span>{shippingFee.toLocaleString()}đ</span>
        </div>
      )}

      <div className="flex justify-between border-t border-[var(--border-default)] pt-3 text-lg font-semibold text-[var(--color-primary)]">
        <span>Tổng cộng</span>
        <span>{total.toLocaleString()}đ</span>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border-default)] pt-3 text-xs text-[var(--text-secondary)]">
        <span>Thanh toán: {paymentMethod}</span>
        {isPaid && (
          <Tag tone="green" variant="light" size="sm">
            Đã thanh toán
          </Tag>
        )}
      </div>
    </div>
  );
}
