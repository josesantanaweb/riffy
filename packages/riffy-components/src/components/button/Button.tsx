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

const BUTTON_VARIANTS = {
  default: 'bg-base-600 text-white hover:bg-base-600/90',
  primary: 'bg-primary-600 text-white hover:bg-primary-600/90',
  danger: 'bg-red-600/30 text-red-500 hover:bg-red-600/20',
  success: 'bg-green-600 text-white hover:bg-green-600/90',
} as const;

const BUTTON_SIZES = {
  sm: {
    height: 'h-9',
    padding: 'px-4',
    textSize: 'text-xs',
    textTransform: 'capitalize',
  },
  md: {
    height: 'h-10',
    padding: 'px-5',
    textSize: 'text-sm',
    textTransform: 'capitalize',
  },
  lg: {
    height: 'h-12',
    padding: 'px-6',
    textSize: 'text-base',
    textTransform: 'uppercase',
  },
} as const;

const BASE_BUTTON_CLASSES = [
  'rounded-lg',
  'font-medium',
  'transition-all',
  'flex',
  'gap-2',
  'items-center',
  'justify-center',
  'whitespace-nowrap',
].join(' ');

const DISABLED_CLASSES = 'opacity-50 cursor-not-allowed pointer-events-none';

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
  const sizeConfig = BUTTON_SIZES[size];

  const buttonClasses = cn(
    BASE_BUTTON_CLASSES,
    BUTTON_VARIANTS[variant],
    sizeConfig.height,
    sizeConfig.padding,
    sizeConfig.textSize,
    sizeConfig.textTransform,
    disabled && DISABLED_CLASSES,
    isFull ? 'w-full' : 'w-auto',
    className,
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
