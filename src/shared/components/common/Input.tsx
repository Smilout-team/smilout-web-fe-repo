import React from 'react';
import clsx from 'clsx';

type InputSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-[var(--text-sm)] rounded-[var(--radius-md)]',
  md: 'px-4 py-3 text-[var(--text-md)] rounded-[var(--radius-md)]',
  lg: 'px-5 py-4 text-[var(--text-lg)] rounded-[var(--radius-md)]',
};

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      error,
      icon,
      onIconClick,
      inputSize = 'md',
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className={clsx('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block font-[var(--font-medium)] text-[var(--text-primary)] text-[var(--text-sm)]"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-[var(--color-danger)]">*</span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            required={required}
            className={clsx(
              'w-full border bg-[var(--bg-card)] transition outline-none',
              'focus:ring-2',
              error
                ? [
                    'border-[var(--border-danger)]',
                    'focus:border-[var(--border-danger)]',
                    'focus:ring-[var(--border-danger)]/30',
                  ]
                : [
                    'border-[var(--border-default)]',
                    'focus:border-[var(--border-focus)]',
                    'focus:ring-[var(--border-focus)]/30',
                  ],
              icon && 'pr-11',
              sizeStyles[inputSize],
              className
            )}
            {...props}
          />

          {icon && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onIconClick}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              {icon}
            </button>
          )}
        </div>

        {error && <p className="text-[var(--color-danger)]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
