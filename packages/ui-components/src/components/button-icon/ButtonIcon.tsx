'use client';
import React from 'react';
import type { ReactElement } from 'react';

import { cn } from '../../utils/cn';

interface ButtonIconProps {
  onClick: () => void;
  children: ReactElement;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'danger' | 'success';
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const variants = {
  default: 'bg-base-500 text-base-300 hover:text-white',
  primary: 'bg-primary-600 text-white hover:bg-primary-600',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  success: 'bg-green-600 text-white hover:bg-green-500',
};

const ButtonIcon = ({
  onClick,
  children,
  className,
  size = 'md',
  variant = 'default',
}: ButtonIconProps): ReactElement => {
  const customClass = cn(
    sizes[size],
    variants[variant],
    'p-0 rounded',
    className,
  );

  return (
    <button onClick={onClick} className={customClass}>
      {children}
    </button>
  );
};

export default ButtonIcon;
