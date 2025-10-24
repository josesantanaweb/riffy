'use client';
import type { ReactElement } from 'react';
import React from 'react';

import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'danger' | 'default' | 'success';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isFull?: boolean;
  'data-testid'?: string;
}

const BUTTON_VARIANTS = {
  default: 'bg-button-bg text-button-text hover:bg-button-bg',
  primary: 'bg-primary-500 text-white hover:bg-primary-500/90',
  danger: 'bg-danger-500/30 text-danger-500 hover:bg-danger-500/20',
  success: 'bg-success-500 text-white hover:bg-success-500/90',
} as const;

const BUTTON_SIZES = {
  sm: {
    height: 'h-9',
    padding: 'px-4',
    textSize: 'text-xs',
    fontWeight: 'font-medium',
    textTransform: 'capitalize',
  },
  md: {
    height: 'h-10',
    padding: 'px-5',
    textSize: 'text-sm',
    fontWeight: 'font-medium',
    textTransform: 'capitalize',
  },
  lg: {
    height: 'h-12',
    padding: 'px-6',
    textSize: 'text-base',
    fontWeight: 'font-semibold',
    textTransform: 'uppercase',
  },
} as const;

const BASE_BUTTON_CLASSES = [
  'rounded-lg',
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
    sizeConfig.fontWeight,
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
