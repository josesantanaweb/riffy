'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { createActionButtons } from '../amount-button/actions';

export const MIN_BET_AMOUNT = 1;

type ActionType = 'none' | 'plus-minus' | 'min-half-2x';

interface NumberInputProps {
  value: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  maxValue: number;
  disabled?: boolean;
  className?: string;
  variant?: 'modal' | 'default';
  actionsType?: ActionType;
}

const NumberInput = ({
  value = 0,
  onChange,
  placeholder = '0',
  maxValue,
  disabled = false,
  actionsType = 'none',
  className,
  variant = 'default',
}: NumberInputProps): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>(value?.toString());

  useEffect(() => {
    setInputValue(value?.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numericValue = parseFloat(newValue) || 0;
    onChange?.(numericValue);
  };

  const handleMin = () => {
    setInputValue(MIN_BET_AMOUNT.toString());
    onChange?.(MIN_BET_AMOUNT);
  };

  const handleHalf = () => {
    const current = parseFloat(inputValue) || 0;
    const half = Math.max(MIN_BET_AMOUNT, Math.floor(current / 2));
    setInputValue(half.toString());
    onChange?.(half);
  };

  const handleDouble = () => {
    const current = parseFloat(inputValue) || 0;
    const double = maxValue ? Math.min(maxValue, current * 2) : current * 2;
    setInputValue(double.toString());
    onChange?.(double);
  };

  const handleMinus = () => {
    const current = parseFloat(inputValue) || 0;
    const minus = Math.max(
      MIN_BET_AMOUNT,
      parseFloat((current - 1).toFixed(2)),
    );
    setInputValue(minus.toString());
    onChange?.(minus);
  };

  const handlePlus = () => {
    const current = parseFloat(inputValue) || 0;
    const plus = maxValue
      ? Math.min(maxValue, parseFloat((current + 1).toFixed(2)))
      : parseFloat((current + 1).toFixed(2));
    setInputValue(plus.toString());
    onChange?.(plus);
  };

  const inputClass = cn(
    'w-full rounded-lg h-[50px] px-4 text-base-300 text-base border border-base-600 bg-transparent placeholder:text-base-300 focus:outline-none focus:border-primary-500 transition-colors',
    disabled && 'opacity-80 cursor-not-allowed',
    className,
  );

  const variantButtonClass =
    variant === 'modal'
      ? 'bg-base-700 hover:bg-base-600'
      : 'bg-base-800 hover:bg-base-700';

  const disabledButtonClass = (isDisabled: boolean) =>
    isDisabled ? 'opacity-60 cursor-not-allowed' : '';

  const defaultButtonClass = cn(
    'text-sm px-4 text-base-100 font-medium h-[42px] rounded-lg cursor-pointer transition-colors flex items-center justify-center',
    actionsType === 'plus-minus' ? 'w-[42px]' : 'w-auto',
  );

  const maxButtonClass = (isDisabled: boolean) =>
    cn(defaultButtonClass, variantButtonClass, disabledButtonClass(isDisabled));

  return (
    <div className="relative">
      <input
        data-testid="input-amount"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled}
        min="0"
        step="0.01"
      />
      {actionsType !== 'none' && (
        <div className="flex items-center gap-1 absolute right-[4px] top-[4px]">
          {(() => {
            const keysToShow =
              actionsType === 'plus-minus'
                ? ['minus', 'plus']
                : ['min', 'half', 'double'];
            return createActionButtons(
              disabled,
              maxValue,
              maxButtonClass,
              inputValue,
              handleMin,
              handleHalf,
              handleDouble,
              handleMinus,
              handlePlus,
            )
              .filter(btn => keysToShow.includes(btn.key))
              .map(button => (
                <button
                  key={button.key}
                  className={button.className}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  title={button.label}
                >
                  {button.icon ? (
                    <span className={`icon-${button.icon}`}></span>
                  ) : (
                    button.label
                  )}
                </button>
              ));
          })()}
        </div>
      )}
    </div>
  );
};

export default NumberInput;
