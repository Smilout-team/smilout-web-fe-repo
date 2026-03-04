import { ResultCard } from './ResultCard';

interface TopUpResultPendingProps {
  onReturnToWallet: () => void;
}

export const TopUpResultPending = ({
  onReturnToWallet,
}: TopUpResultPendingProps) => {
  return (
    <ResultCard
      icon="⏱"
      title="Đang xác nhận thanh toán"
      message="Giao dịch của bạn đang được xử lý. Vui lòng quay lại sau."
      buttonText="Quay lại ví"
      onButtonClick={onReturnToWallet}
      iconBgColor="bg-amber-100"
      iconColor="text-amber-600"
    />
  );
};
