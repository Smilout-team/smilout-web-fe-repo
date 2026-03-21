import { ReceiptText, Store } from 'lucide-react';
import { Button } from '@/shared/components/common/Button';
import { useLatestOrder } from '@/features/order-history/hooks/useLatestOrder';

interface QuickReorderSectionProps {
  onViewAll: () => void;
  onReorder: (orderId: string) => void;
}

export const QuickReorderSection = ({
  onViewAll,
  onReorder,
}: QuickReorderSectionProps) => {
  const recentOrder = useLatestOrder();
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[length:var(--text-xl)] font-[var(--font-semibold)] text-[var(--text-primary)]">
          Mua lại nhanh
        </h3>
        <button
          type="button"
          className="text-[length:var(--text-sm)] text-[var(--color-primary)]"
          onClick={onViewAll}
        >
          Xem tất cả
        </button>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] p-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-page)] text-[var(--text-secondary)]">
            <ReceiptText size={18} />
          </div>

          <div className="flex-1">
            <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
              Đơn hàng gần nhất
            </p>
            <p className="line-clamp-2 text-[length:var(--text-md)] font-[var(--font-medium)] text-[var(--text-primary)]">
              {recentOrder.data?.items
                .map((item) => item.productName)
                .join(', ') || 'Không có đơn hàng nào'}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
              <Store size={14} />
              {recentOrder.data?.storeName || 'Không xác định'}
            </p>
          </div>

          <p className="text-[length:var(--text-md)] font-[var(--font-medium)] text-[var(--color-primary)]">
            {recentOrder.data?.totalPrice.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }) || ''}
          </p>
        </div>

        <Button
          variant="primary"
          fullWidth
          className="mt-3"
          onClick={() => onReorder(recentOrder.data?.id || '')}
        >
          Mua lại đơn hàng này
        </Button>
      </div>
    </section>
  );
};

export default QuickReorderSection;
