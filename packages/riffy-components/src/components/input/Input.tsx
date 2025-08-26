'use client';
import React from 'react';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps {
  id?: string;
  className?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode | string;
  iconPosition?: 'left' | 'right';
  onIconClick?: () => void;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      error,
      icon,
      iconPosition = 'right',
      onIconClick,
      className,
      ...props
    },
    ref,
  ) => {
    const inputClass = cn(
      'h-12 w-full text-base text-white border border-base-600 rounded-lg bg-transparent placeholder:text-base-300 focus:outline-none transition-colors transition-colors px-4 outline-none placeholder-base-300',
      icon && iconPosition === 'right' && 'pr-10',
      icon && iconPosition === 'left' && 'pl-10',
      className,
    );

    const renderIcon = (icon: React.ReactNode | string) => {
      if (typeof icon === 'string') {
        return <i className={icon} />;
      }
      return icon;
    };

    return (
      <div className="relative w-full">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-base-300">
            {renderIcon(icon)}
          </span>
        )}

        <input id={id} ref={ref} className={inputClass} {...props} />

        {icon && iconPosition === 'right' && (
          <span
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-base-300 ${
              onIconClick ? 'cursor-pointer transition-colors' : ''
            }`}
            onClick={onIconClick}
          >
            {renderIcon(icon)}
          </span>
        )}

        {error && <span className="text-xs text-red-500 px-1">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
