import ReturnButton from '@/shared/components/common/ReturnButton';
import OrderItem from '../components/OrderItem';
import OrderSummary from '../components/OrderSummary';
import Tag from '@/shared/components/common/Tag';

export default function OrderDetailPage() {
  const items = [
    { name: 'Trà sữa trân châu', quantity: 1, price: 25000 },
    { name: 'Bánh mì', quantity: 1, price: 25000 },
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ReturnButton variant="mobile" />
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">
          Chi tiết đơn hàng
        </h1>
      </div>

      {/* Customer */}
      <div className="rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
        <p className="font-medium text-[var(--text-primary)]">Nguyễn Văn B</p>

        <p className="text-sm text-[var(--text-secondary)]">#123456789</p>

        <div className="mt-2">
          <Tag tone="blue" size="sm">
            Đang chuẩn bị
          </Tag>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
        {items.map((item, index) => (
          <OrderItem key={index} {...item} />
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
        <OrderSummary subtotal={50000} shipping={15000} />
      </div>
    </div>
  );
}
