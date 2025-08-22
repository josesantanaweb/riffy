'use client';
import React from 'react';
import { cn } from '../../utils/cn';

interface AmountButtonProps {
  amount: number;
  isSelected?: boolean;
  onClick: (amount: number) => void;
  variant?: 'modal' | 'default';
  disabled?: boolean;
}

const AmountButton = ({
  amount,
  isSelected,
  onClick,
  variant = 'default',
  disabled = false,
}: AmountButtonProps): React.ReactElement => {
  const baseClass = cn(
    'flex items-center justify-center rounded-lg h-[45px] cursor-pointer transition-all font-medium text-sm',
    disabled && 'opacity-50 cursor-not-allowed',
  );
  const variantClass =
    variant === 'modal' ? 'bg-base-700' : 'bg-base-800 hover:bg-base-700';
  const selectedClass = isSelected ? 'bg-base-600 text-white' : 'text-base-100';

  const buttonClass = cn(baseClass, variantClass, selectedClass);

  return (
    <button
      data-testid={`amount-${amount}`}
      className={buttonClass}
      onClick={() => onClick(amount)}
      disabled={disabled}
    >
      {amount}
    </button>
  );
};

export default AmountButton;
