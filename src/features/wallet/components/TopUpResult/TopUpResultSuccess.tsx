import { ResultCard } from './ResultCard';

interface TopUpResultSuccessProps {
  amount?: number;
  onReturnToWallet: () => void;
}

export const TopUpResultSuccess = ({
  amount,
  onReturnToWallet,
}: TopUpResultSuccessProps) => {
  const message = amount
    ? `Bạn đã nạp ${amount.toLocaleString('vi-VN')} đ vào tài khoản`
    : '';

  return (
    <ResultCard
      icon="✓"
      title="Nạp tiền thành công"
      message={message}
      buttonText="Quay lại ví"
      onButtonClick={onReturnToWallet}
      iconBgColor="bg-green-100"
      iconColor="text-green-600"
    />
  );
};
