import React from 'react';
import clsx from 'clsx';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'outline'
  | 'ghost'
  | 'soft';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonShape = 'default' | 'pill';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    'bg-gradient-to-r',
    'from-[var(--red-400)] via-[var(--red-500)] to-[var(--red-600)]',
    'text-[var(--text-on-primary)]'
  ),

  secondary: clsx(
    'bg-[var(--bg-card)]',
    'border border-[var(--border-default)]',
    'text-[var(--text-primary)]'
  ),

  success: clsx('bg-[var(--color-success)]', 'text-[var(--text-inverse)]'),

  danger: clsx('bg-[var(--color-danger)]', 'text-[var(--text-inverse)]'),

  outline: clsx(
    'bg-transparent',
    'border border-[var(--color-danger)]',
    'text-[var(--color-danger)]'
  ),

  ghost: clsx('bg-transparent', 'text-[var(--text-primary)]'),

  soft: clsx('bg-[rgba(255,82,82,0.1)]', 'text-[var(--color-primary)]'),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

const shapeStyles: Record<ButtonShape, string> = {
  default: 'rounded-[12px]',
  pill: 'rounded-full',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  shape = 'default',
  fullWidth = false,
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  textColor,
  className,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      style={textColor ? { color: textColor } : undefined}
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'font-medium',
        'transition-all duration-200',
        'select-none',

        variantStyles[variant],

        sizeStyles[size],
        shapeStyles[shape],
        fullWidth && 'w-full',

        loading && 'cursor-wait opacity-60',
        disabled &&
          !loading &&
          'cursor-not-allowed bg-[var(--gray-300)] text-[var(--gray-500)]',
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {!loading && leftIcon}
      {!loading && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
