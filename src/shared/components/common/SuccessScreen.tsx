import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface SuccessHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const SuccessHeader: React.FC<SuccessHeaderProps> = ({
  title = 'Đặt hàng thành công!',
  description,
  className,
}) => {
  return (
    <div
      className={clsx(
        'relative flex w-full flex-col items-center justify-center overflow-hidden',
        'bg-[var(--color-success)]',
        'px-4 pt-12 pb-16',
        className
      )}
    >
      <div className="absolute top-10 -left-1 h-38 w-38 rounded-full bg-[var(--bg-card)] opacity-10"></div>
      <div className="absolute -right-1 -bottom-1 h-38 w-38 rounded-full bg-[var(--bg-card)] opacity-10"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
          <Check
            className="h-12 w-12 text-[var(--color-success)]"
            strokeWidth={3.5}
          />
        </div>
        <h1 className="mb-2 text-[length:var(--text-2xl)] font-[var(--font-semibold)] tracking-tight text-[var(--text-inverse)]">
          {title}
        </h1>
        {description && (
          <p className="text-[length:var(--text-lg)] text-[var(--text-inverse)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SuccessHeader;
