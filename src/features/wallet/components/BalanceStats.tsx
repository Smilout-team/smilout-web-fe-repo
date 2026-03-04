import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface BalanceStatsProps {
  monthlySpent: number;
  monthlyDeposit: number;
}

export const BalanceStats: React.FC<BalanceStatsProps> = ({
  monthlySpent,
  monthlyDeposit,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#6B7280] uppercase">
            Nạp trong tháng
          </span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECFDF5]">
            <TrendingUp size={16} color="#10B981" />
          </div>
        </div>
        <p className="text-xl font-bold text-[#10B981]">
          {formatCurrency(monthlyDeposit)}
        </p>
      </div>

      <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#6B7280] uppercase">
            Chi trong tháng
          </span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FEF2F2]">
            <TrendingDown size={16} color="#FF6B6B" />
          </div>
        </div>
        <p className="text-xl font-bold text-[#FF6B6B]">
          {formatCurrency(monthlySpent)}
        </p>
      </div>
    </div>
  );
};

export default BalanceStats;
