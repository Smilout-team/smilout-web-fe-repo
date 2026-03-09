import { ShoppingBag } from 'lucide-react';

export default function OrderEmptyState() {
  return (
    <div className="mt-20 flex h-full flex-col items-center justify-center text-[var(--text-secondary)]">
      <ShoppingBag size={64} className="mb-4 text-[var(--text-muted)]" />
      <p className="text-[length:var(--text-md)] font-[var(--font-medium)]">
        Bạn chưa có đơn hàng nào
      </p>
    </div>
  );
}
