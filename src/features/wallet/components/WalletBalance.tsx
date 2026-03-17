import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/common/Button';
import { formatCurrency } from '../utils/currency';

interface WalletBalanceProps {
  balance: number;
  onTopUpClick?: () => void;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({
  balance,
  onTopUpClick,
}) => {
  const displayBalance = useMemo(() => formatCurrency(balance), [balance]);

  const bgGradient =
    balance > 50000
      ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]'
      : 'bg-gradient-to-br from-red-500 to-red-700';

  const textGradient =
    balance > 50000
      ? 'text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200'
      : 'text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${bgGradient} px-6 py-8 text-white`}
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10" />

      <div className="relative z-10 space-y-4">
        <div>
          <p className={`text-lg font-semibold ${textGradient}`}>Số dư ví</p>
          <p className={`mt-1 text-4xl font-bold ${textGradient}`}>
            {displayBalance}
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={onTopUpClick}
          leftIcon={<Plus size={20} />}
          className="w-full bg-white font-semibold text-[var(--color-primary)] hover:bg-gray-50"
        >
          Nạp tiền vào ví
        </Button>
      </div>
    </div>
  );
};

export default WalletBalance;
