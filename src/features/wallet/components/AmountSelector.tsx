import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  formatCurrency,
  parseCurrencyInput,
  WALLET_CONSTANTS,
} from '../utils/currency';

interface AmountSelectorProps {
  value: number;
  onAmountSelect: (amount: number) => void;
  presetAmounts?: number[];
  minAmount?: number;
  maxAmount?: number;
}

const DEFAULT_PRESET_AMOUNTS = WALLET_CONSTANTS.DEFAULT_PRESET_AMOUNTS;
const DEFAULT_MIN_AMOUNT = WALLET_CONSTANTS.MIN_AMOUNT;
const DEFAULT_MAX_AMOUNT = WALLET_CONSTANTS.MAX_AMOUNT;

export const AmountSelector: React.FC<AmountSelectorProps> = ({
  value,
  onAmountSelect,
  presetAmounts = DEFAULT_PRESET_AMOUNTS,
  minAmount = DEFAULT_MIN_AMOUNT,
  maxAmount = DEFAULT_MAX_AMOUNT,
}) => {
  const isValidAmount = useMemo(
    () => value >= minAmount && value <= maxAmount,
    [value, minAmount, maxAmount]
  );

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseCurrencyInput(e.target.value);
    onAmountSelect(newValue);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onAmountSelect(amount)}
            className={clsx(
              'rounded-lg border-2 px-4 py-3 text-lg font-semibold transition-all duration-200',
              value === amount
                ? 'border-[#FF6B6B] bg-[#FFE8E8] text-[#FF6B6B]'
                : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#FF6B6B]'
            )}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#6B7280]">
          Hoặc nhập số tiền khác
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={value > 0 ? value.toLocaleString('vi-VN') : ''}
            onChange={handleCustomAmountChange}
            placeholder="Nhập số tiền (tối thiểu 10.000đ)"
            className="w-full rounded-lg border-2 border-[#E5E7EB] bg-white px-6 py-3 text-right text-lg font-semibold transition-colors outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FFE8E8]"
          />
          {value > 0 && (
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-[#6B7280]">
              đ
            </span>
          )}
        </div>
      </div>

      {value > 0 && (
        <div className="rounded-lg bg-[#F0F4F8] px-4 py-3">
          <p className="text-center text-[#6B7280]">
            Bạn sẽ nạp:{' '}
            <span className="font-bold text-[#FF6B6B]">
              {formatCurrency(value)}
            </span>
          </p>
        </div>
      )}

      {value > 0 && !isValidAmount && (
        <div className="rounded-lg border-l-4 border-[#FF6B6B] bg-[#FEF2F2] px-4 py-3">
          <p className="text-sm font-medium text-[#FF6B6B]">
            {value < minAmount
              ? `Số tiền nạp tối thiểu là ${formatCurrency(minAmount)}`
              : `Số tiền nạp tối đa là ${formatCurrency(maxAmount)}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AmountSelector;
