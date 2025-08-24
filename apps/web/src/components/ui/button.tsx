import React from 'react';

export type ButtonVariant = 'filled' | 'outlined' | 'basic' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  href?: string;
  radius?: ButtonRadius;
  hasLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  label,
  disabled = false,
  href,
  radius = 'md',
  hasLoading,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-medium transition-all focus:outline-none';
  const variants: Record<ButtonVariant, string> = {
    filled:
      'bg-primary-1 text-gray-1 hover:bg-primary-2 disabled:bg-gray-3 disabled:hover:bg-gray-3 disabled:text-gray-2',
    outlined:
      'bg-transparent text-primary-3 hover:bg-primary-3/10 border border-primary-3 disabled:hover:bg-transparent disabled:text-gray-3 disabled:border-gray-3',
    basic:
      'bg-transparent text-primary-2 hover:bg-primary-2/10 disabled:text-gray-3 disabled:hover:bg-transparent',
    link: 'bg-transparent text-primary-1 p-0 hover:text-primary-2 border-none disabled:hover:text-primary-1',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-6 py-3 text-lg h-12',
  };
  const actionStyles: Record<'true' | 'false', string> = {
    true: 'cursor-default',
    false: 'cursor-pointer',
  };
  const radiusStyles: Record<ButtonRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const composed = [
    base,
    variants[variant],
    sizes[size],
    className,
    actionStyles[String(disabled) as 'true' | 'false'],
    radiusStyles[radius],
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      className={composed}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="btn-icon-left mr-2">{leftIcon}</span>}
      <span>{label}</span>
      {rightIcon && <span className="btn-icon-right ml-2">{rightIcon}</span>}
    </button>
  );
};
