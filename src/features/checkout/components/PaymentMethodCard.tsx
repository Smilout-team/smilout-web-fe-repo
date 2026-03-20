import { AlertCircle, Wallet } from 'lucide-react';

interface PaymentMethodCardProps {
  balance: number;
  isInsufficientBalance: boolean;
  shortage: number;
  onTopUp: () => void;
  formatCurrency: (amount: number) => string;
}

export function PaymentMethodCard({
  balance,
  isInsufficientBalance,
  shortage,
  onTopUp,
  formatCurrency,
}: PaymentMethodCardProps) {
  const colorClass = isInsufficientBalance
    ? 'bg-red-100 border-red-500'
    : 'bg-blue-100 border-[var(--color-primary)]';
  const bgColorClass = isInsufficientBalance
    ? 'bg-red-900'
    : 'bg-[var(--color-primary)]';
  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-medium text-gray-700">
        Phương thức thanh toán
      </h2>
      <div
        className={`flex items-center justify-between rounded-lg border-2 ${colorClass} p-3`}
      >
        <div className="flex items-center gap-3">
          <div className={`rounded-full ${bgColorClass} p-2`}>
            <Wallet size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">Ví SMILOUT</div>
            <div className="text-sm text-gray-600">
              Số dư: {formatCurrency(balance)}đ
            </div>
          </div>
        </div>
      </div>

      {isInsufficientBalance && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3">
          <AlertCircle size={18} className="mt-0.5 text-red-500" />
          <div className="flex-1">
            <div className="text-sm font-medium text-red-900">
              Số dư không đủ. Thiếu {formatCurrency(shortage)}đ
            </div>
            <button
              onClick={onTopUp}
              className="mt-1 text-sm font-medium text-red-600 underline"
            >
              Nạp Tiền ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
