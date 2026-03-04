import { type ReactNode } from 'react';
import { Button } from '@/shared/components/common/Button';

interface ResultCardProps {
  icon: ReactNode;
  title: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  iconBgColor?: string;
  iconColor?: string;
}

export const ResultCard = ({
  icon,
  title,
  message,
  buttonText = 'Quay lại ví',
  onButtonClick,
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
}: ResultCardProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mb-4 flex justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBgColor}`}
            >
              <span className={`text-2xl ${iconColor}`}>{icon}</span>
            </div>
          </div>
          <h2 className="text-center text-lg font-semibold text-gray-900">
            {title}
          </h2>
          {message && (
            <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
          )}
          {onButtonClick && (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onButtonClick}
              className="mt-6 h-12 rounded-lg"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
