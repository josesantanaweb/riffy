'use client';
import type { ReactElement } from 'react';
import React from 'react';

import { cn } from '../../utils/cn';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isFull?: boolean;
  'data-testid'?: string;
}

const variants = {
  default: 'bg-base-600 text-white hover:bg-base-600/90',
  primary: 'bg-primary-600 text-white hover:bg-primary-600/90',
  danger: 'bg-red-600/30 text-red-500 hover:bg-red-600/20',
  success: 'bg-green-600 text-white hover:bg-green-600/90',
};

const sizes = {
  sm: 'h-9 px-4 text-xs capitalize',
  md: 'h-10 px-5 text-sm capitalize',
  lg: 'h-12 px-6 text-base uppercase',
};

const Button = ({
  type = 'button',
  onClick,
  children,
  className,
  disabled,
  variant = 'default',
  size = 'lg',
  isFull = false,
  'data-testid': dataTestId,
}: ButtonProps): ReactElement => {
  const baseClass =
    'rounded-lg font-medium transition-all flex gap-2 items-center justify-center whitespace-nowrap';

  const fullClass = isFull ? 'w-full' : 'auto';

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const customClass = cn(
    baseClass,
    variants[variant],
    sizes[size],
    disabledClass,
    fullClass,
    className,
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={customClass}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
