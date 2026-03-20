import ReturnButton from '@/shared/components/common/ReturnButton';
import OrderStatusTag from './OrderStatusTag';
import type { Order } from '../types/order.type';

interface Props {
  order: Order;
}

export default function OrderDetailHeader({ order }: Props) {
  return (
    <div className="bg-[var(--color-primary)] px-4 pt-5 pb-6 text-white">
      <div className="mb-3 flex items-center gap-3">
        <ReturnButton variant="web" className="bg-white/20 hover:bg-white/30" />

        <div className="flex-1">
          <p className="text-lg font-semibold text-[var(--text-on-primary)]">
            Chi tiết đơn hàng
          </p>
          <p className="text-sm text-[var(--text-on-primary)] opacity-90">
            #{order.id}
          </p>
        </div>

        <OrderStatusTag status={order.status} />
      </div>
    </div>
  );
}
