'use client';
import React from 'react';
import { cn } from '@riffy/utils';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Switch = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className
}: SwitchProps) => {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: checked ? 'translate-x-4' : 'translate-x-0.5'
    },
    md: {
      container: 'w-10 h-5',
      thumb: 'w-4 h-4',
      translate: checked ? 'translate-x-5' : 'translate-x-0.5'
    },
    lg: {
      container: 'w-12 h-6',
      thumb: 'w-5 h-5',
      translate: checked ? 'translate-x-6' : 'translate-x-0.5'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn('flex items-center gap-3 cursor-pointer', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={cn(
          'relative flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none hover:scale-105 active:scale-95',
          currentSize.container,
          checked
            ? 'bg-primary-500 shadow-lg shadow-primary-500/25'
            : 'bg-primary-500/50',
          disabled && 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100'
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow-lg transform transition-all duration-300 ease-in-out',
            currentSize.thumb,
            currentSize.translate,
            checked && 'shadow-md'
          )}
        />
      </button>
      {label && (
        <span className="text-sm text-body-100 font-medium">
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;
