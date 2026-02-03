import React from 'react';
import clsx from 'clsx';

interface AuthHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  size?: 'sm' | 'md';
  className?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  icon,
  title,
  description,
  align = 'center',
  size = 'md',
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        size === 'md',
        size === 'sm',
        className
      )}
    >
      {icon && (
        <div
          className={clsx(
            'flex items-center justify-center',
            size === 'md' && 'mb-2',
            size === 'sm' && 'mb-1'
          )}
        >
          {icon}
        </div>
      )}

      <h4
        className={clsx(
          'font-[var(--font-semibold)] text-[var(--text-primary)]',
          size === 'md' && 'text-[var(--text-2xl)]',
          size === 'sm' && 'text-[var(--text-xl)]'
        )}
      >
        {title}
      </h4>

      {description && (
        <p className="max-w-[320px] text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
};
