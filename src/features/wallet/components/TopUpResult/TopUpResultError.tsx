import { ResultCard } from './ResultCard';

interface TopUpResultErrorProps {
  error: string;
  onRetry: () => void;
}

export const TopUpResultError = ({ error, onRetry }: TopUpResultErrorProps) => {
  return (
    <ResultCard
      icon="✕"
      title="Có lỗi xảy ra"
      message={error}
      buttonText="Quay lại ví"
      onButtonClick={onRetry}
      iconBgColor="bg-red-100"
      iconColor="text-red-600"
    />
  );
};
