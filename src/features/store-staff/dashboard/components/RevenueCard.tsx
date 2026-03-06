import { Package, DollarSign, TrendingUp } from 'lucide-react';

export default function RevenueCard() {
  return (
    <div className="flex items-center justify-between rounded-[var(--radius-card)] bg-purple-500 p-6 text-[var(--text-on-primary)] shadow-[var(--shadow-card)]">
      <div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={16} />
          <span>Doanh thu hôm nay</span>
        </div>

        <p className="mt-2 text-2xl font-bold text-white">12,450,000 đ</p>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <TrendingUp size={16} />
          <span>+12% so với hôm qua</span>
        </div>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
        <Package size={22} />
      </div>
    </div>
  );
}
