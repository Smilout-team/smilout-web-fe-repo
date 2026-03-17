interface CheckoutSubmitBarProps {
  onSubmit: () => void;
  disabled: boolean;
  isPending: boolean;
  totalAmount: number;
  formatCurrency: (amount: number) => string;
}

export function CheckoutSubmitBar({
  onSubmit,
  disabled,
  isPending,
  totalAmount,
  formatCurrency,
}: CheckoutSubmitBarProps) {
  return (
    <div className="fixed right-0 bottom-16 left-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`w-full rounded-lg px-4 py-3.5 font-semibold text-white transition-colors ${
          disabled
            ? 'bg-gray-300 text-gray-500 disabled:cursor-not-allowed'
            : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
        }`}
      >
        {isPending
          ? 'Đang xử lý...'
          : `Xác nhận thanh toán ${formatCurrency(totalAmount)}đ`}
      </button>
    </div>
  );
}
