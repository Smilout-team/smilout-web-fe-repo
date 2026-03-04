import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/common/Button';
import AmountSelector from './AmountSelector';
import { formatCurrency, WALLET_CONSTANTS } from '../utils/currency';
import { useCreateTopUp } from '../hooks';

const MIN_AMOUNT = WALLET_CONSTANTS.MIN_AMOUNT;
const MAX_AMOUNT = WALLET_CONSTANTS.MAX_AMOUNT;

interface TopUpFormProps {
  onClose?: () => void;
}

export const TopUpForm: React.FC<TopUpFormProps> = () => {
  const [amount, setAmount] = useState(0);
  const { mutate: createTopUp, isPending } = useCreateTopUp();

  const isValidAmount = amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
  const isConfirmDisabled = !isValidAmount || isPending;

  const handleAmountSelect = useCallback((newAmount: number) => {
    setAmount(newAmount);
  }, []);

  const handleConfirm = async () => {
    if (!isValidAmount) {
      toast.error(`Số tiền nạp tối thiểu là ${formatCurrency(MIN_AMOUNT)}`);
      return;
    }

    createTopUp({
      amount,
      paymentMethod: 'BANK_TRANSFER',
      description: 'Nap tien vi',
    });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-[#1F2937]">Nạp tiền vào ví</h2>
      <AmountSelector
        value={amount}
        onAmountSelect={handleAmountSelect}
        minAmount={MIN_AMOUNT}
        maxAmount={MAX_AMOUNT}
      />

      <div className="rounded-lg border-l-4 border-[#2563EB] bg-[#F0F4F8] px-4 py-3">
        <p className="text-xs leading-relaxed text-[#2563EB]">
          Lưu ý: Số tiền nạp sẽ được thêm vào ví SMILOUT của bạn. Không hỗ trợ
          liên kết thẻ trực tiếp theo chính sách bảo mật.
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleConfirm}
        disabled={isConfirmDisabled}
        loading={isPending}
        className="h-14 rounded-[12px] text-lg font-bold"
      >
        Xác nhận nạp tiền
      </Button>
    </div>
  );
};

export default TopUpForm;
