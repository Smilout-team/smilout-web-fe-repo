import { ReceiptText, Store } from 'lucide-react';
import { Button } from '@/shared/components/common/Button';

interface QuickReorderSectionProps {
  onViewAll: () => void;
  onReorder: () => void;
}

export const QuickReorderSection = ({
  onViewAll,
  onReorder,
}: QuickReorderSectionProps) => {
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
              Coca Cola, Snack Lays, Sữa TH...
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
              <Store size={14} />
              CircleK - Nguyễn Huệ
            </p>
          </div>

          <p className="text-[length:var(--text-md)] font-[var(--font-medium)] text-[var(--color-primary)]">
            125.000đ
          </p>
        </div>

        <Button
          variant="primary"
          fullWidth
          className="mt-3"
          onClick={onReorder}
        >
          Mua lại đơn hàng này
        </Button>
      </div>
    </section>
  );
};

export default QuickReorderSection;
