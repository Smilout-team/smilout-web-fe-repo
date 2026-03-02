import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import clsx from 'clsx';

type ReturnButtonVariant = 'web' | 'mobile';

interface ReturnButtonProps {
  variant?: ReturnButtonVariant;
  className?: string;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({
  variant = 'web',
  className,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className={clsx(
          'inline-flex items-center justify-center',
          'p-2',
          'text-[var(--text-primary)]',
          'hover:opacity-80',
          'transition',
          className
        )}
      >
        <ArrowLeft size={24} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className={clsx(
        'inline-flex items-center justify-center',
        'h-10 w-10',
        'rounded-[var(--radius-card)]',
        'bg-[var(--color-primary)]/50',
        'text-[var(--text-on-primary)]',
        'hover:bg-[var(--color-primary-hover)]/70',
        'transition-all duration-200',
        'active:scale-95',
        className
      )}
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default ReturnButton;
