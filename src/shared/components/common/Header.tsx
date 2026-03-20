import React from 'react';
import clsx from 'clsx';
import ReturnButton from './ReturnButton';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  rightElement,
  className,
}) => {
  return (
    <header
      className={clsx(
        'relative flex h-14 w-full items-center justify-center',
        'border-b border-[var(--border-default)]',
        'bg-[var(--bg-card)] px-4',
        className
      )}
    >
      {showBack && (
        <div className="absolute left-2 flex h-full items-center">
          <ReturnButton variant="mobile" />
        </div>
      )}
      <h1 className="line-clamp-1 px-12 text-[length:var(--text-lg)] font-[var(--font-medium)] text-[var(--text-primary)]">
        {title}
      </h1>
      {rightElement && (
        <div className="absolute right-4 flex h-full items-center">
          {rightElement}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
