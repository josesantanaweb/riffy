'use client';
import React from 'react';
import { forwardRef } from 'react';
import Icon, { type IconName } from '../icon';

import { cn } from '../../utils/cn';

interface InputProps {
  id?: string;
  className?: string;
  label?: string;
  isRequired?: boolean;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode | IconName;
  iconPosition?: 'left' | 'right';
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const INPUT_SIZES = {
  sm: {
    height: 'h-9',
    padding: 'px-3',
    textSize: 'text-xs',
    iconSize: 'text-sm',
    iconPadding: { left: 'left-2', right: 'right-2' },
    inputPadding: { left: 'pl-8', right: 'pr-8' },
  },
  md: {
    height: 'h-10',
    padding: 'px-4',
    textSize: 'text-sm',
    iconSize: 'text-base',
    iconPadding: { left: 'left-3', right: 'right-3' },
    inputPadding: { left: 'pl-10', right: 'pr-10' },
  },
  lg: {
    height: 'h-12',
    padding: 'px-4',
    textSize: 'text-base',
    iconSize: 'text-xl',
    iconPadding: { left: 'left-3', right: 'right-3' },
    inputPadding: { left: 'pl-10', right: 'pr-10' },
  },
} as const;

const BASE_INPUT_CLASSES = [
  'text-white',
  'border',
  'border-base-600',
  'rounded-lg',
  'bg-transparent',
  'placeholder:text-base-300',
  'focus:outline-none',
  'transition-colors',
].join(' ');

const ICON_BASE_CLASSES = [
  'absolute',
  'top-[55%]',
  'transform',
  '-translate-y-1/2',
  'text-base-300',
].join(' ');

const ERROR_CLASSES = 'text-xs text-red-500 px-1';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      error,
      icon,
      label,
      isRequired,
      value,
      iconPosition = 'right',
      inputSize = 'lg',
      fullWidth = true,
      className,
      onClick,
      onChange,
      ...props
    },
    ref,
  ) => {
    const sizeConfig = INPUT_SIZES[inputSize];

    const inputClasses = cn(
      BASE_INPUT_CLASSES,
      fullWidth ? 'w-full' : 'w-auto',
      sizeConfig.height,
      sizeConfig.padding,
      sizeConfig.textSize,
      icon && iconPosition === 'right' && sizeConfig.inputPadding.right,
      icon && iconPosition === 'left' && sizeConfig.inputPadding.left,
      className,
    );

    const iconClasses = cn(
      ICON_BASE_CLASSES,
      sizeConfig.iconSize,
      iconPosition === 'left'
        ? sizeConfig.iconPadding.left
        : sizeConfig.iconPadding.right,
    );

    const renderIcon = (iconProp: React.ReactNode | IconName) => {
      if (typeof iconProp === 'string') {
        return (
          <Icon name={iconProp as IconName} className={sizeConfig.iconSize} />
        );
      }
      return iconProp;
    };

    return (
      <div
        className={cn('relative gap-1 flex flex-col', fullWidth && 'w-full')}
        onClick={onClick}
      >
        <label className="text-white text-sm">
          {label}{' '}
          {label && isRequired && <span className="text-red-500">*</span>}
        </label>

        {icon && iconPosition === 'left' && (
          <span className={iconClasses}>{renderIcon(icon)}</span>
        )}

        <input
          id={id}
          ref={ref}
          className={inputClasses}
          value={value}
          onChange={onChange}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <span className={iconClasses}>{renderIcon(icon)}</span>
        )}

        {error && <span className={ERROR_CLASSES}>{error}</span>}
      </div>
    );
  },
);

export default Input;
