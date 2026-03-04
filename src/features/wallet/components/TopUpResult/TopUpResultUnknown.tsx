import { ResultCard } from './ResultCard';

interface TopUpResultUnknownProps {
  onReturnToWallet: () => void;
}

export const TopUpResultUnknown = ({
  onReturnToWallet,
}: TopUpResultUnknownProps) => {
  return (
    <ResultCard
      icon="?"
      title="Không tìm thấy trạng thái giao dịch"
      buttonText="Quay lại ví"
      onButtonClick={onReturnToWallet}
    />
  );
};
