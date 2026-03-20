import { ResultCard } from './ResultCard';

type FailureStatus = 'FAILED' | 'CANCELLED';

interface TopUpResultFailedProps {
  status: FailureStatus;
  onRetry: () => void;
}

export const TopUpResultFailed = ({
  status,
  onRetry,
}: TopUpResultFailedProps) => {
  const isCancelled = status === 'CANCELLED';
  const title = isCancelled ? 'Thanh toán bị hủy' : 'Thanh toán thất bại';
  const message = isCancelled
    ? 'Bạn đã hủy giao dịch thanh toán.'
    : 'Giao dịch của bạn không thành công. Vui lòng thử lại.';

  return (
    <ResultCard
      icon="✕"
      title={title}
      message={message}
      buttonText="Quay lại ví"
      onButtonClick={onRetry}
      iconBgColor="bg-red-100"
      iconColor="text-red-600"
    />
  );
};
