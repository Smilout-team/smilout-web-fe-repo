import { Package, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function RevenueCard({
  revenue,
  compareToYesterday,
}: {
  revenue: number;
  compareToYesterday: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-[var(--radius-card)] bg-[var(--bg-card)] p-6 text-[var(--text-on-primary)] shadow-[var(--shadow-card)]">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <DollarSign size={16} />
          <span>Doanh thu hôm nay</span>
        </div>

        <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
          {revenue.toLocaleString('vi-VN')} đ
        </p>

        <div className="mt-2 flex items-center gap-1 text-sm">
          {compareToYesterday >= 0 ? (
            <>
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-500">
                {compareToYesterday.toFixed(2)}% so với hôm qua
              </span>
            </>
          ) : (
            <>
              <TrendingDown size={16} className="text-red-500" />
              <span className="text-red-500">
                {compareToYesterday.toFixed(2)}% so với hôm qua
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
        <Package size={22} />
      </div>
    </div>
  );
}
