import React from 'react';
import clsx from 'clsx';

type TagTone = 'red' | 'green' | 'blue' | 'gray' | 'primary';

type TagVariant = 'light' | 'solid' | 'outline';

type TagRadius = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type TagSize = 'xs' | 'sm' | 'md' | 'lg';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  variant?: TagVariant;
  icon?: React.ReactNode;
  rounded?: TagRadius;
  size?: TagSize;
}

const toneStyles: Record<TagTone, Record<TagVariant, string>> = {
  red: {
    light: 'bg-[var(--color-danger)] text-[var(--text-on-primary)]',

    solid: 'bg-[var(--color-danger)] text-[var(--text-primary)]',

    outline:
      'bg-[var(--bg-card)] border border-[var(--color-danger)] text-[var(--color-danger)]',
  },

  green: {
    light:
      'bg-[color-mix(in_srgb,var(--color-success)_20%,white)] text-[var(--color-success)]',

    solid: 'bg-[var(--color-success)] text-[var(--text-inverse)]',

    outline:
      'bg-[var(--bg-card)] border border-[var(--color-success)] text-[var(--color-success)]',
  },

  blue: {
    light: 'bg-blue-100 text-blue-600',

    solid: 'bg-blue-500 text-white',

    outline: 'border border-blue-500 text-blue-500 bg-transparent',
  },

  gray: {
    light: 'bg-[var(--bg-muted)] text-[var(--text-secondary)]',

    solid: 'bg-[var(--text-secondary)] text-[var(--text-inverse)]',

    outline:
      'bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)]',
  },

  primary: {
    light: 'bg-[var(--color-primary)] text-[var(--color-white)] opacity-80',

    solid: 'bg-[var(--color-primary-button)] text-[var(--color-white)]',

    outline: 'bg-[var(--color-primary-button)] text-[var(--color-white)]',
  },
};

const sizeStyles: Record<TagSize, string> = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const iconSizeMap: Record<TagSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
};

const radiusStyles: Record<TagRadius, string> = {
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  xl: 'rounded-[var(--radius-xl)]',
  full: 'rounded-full',
};

export const Tag: React.FC<TagProps> = ({
  tone = 'gray',
  variant = 'light',
  size = 'md',
  icon,
  rounded = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
        toneStyles[tone][variant],
        sizeStyles[size],
        radiusStyles[rounded],
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex items-center">
          {React.isValidElement(icon)
            ? React.cloneElement(
                icon as React.ReactElement<{ size?: number }>,
                {
                  size: iconSizeMap[size],
                }
              )
            : icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default Tag;
