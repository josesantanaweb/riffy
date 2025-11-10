'use client';
import React from 'react';
import { cn } from '@riffy/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
  id,
  name,
}) => {
  const baseClasses =
    'w-5 h-5 border-2 rounded transition-all duration-200 ease-in-out';
  const customClasses = {
    'border-input-border bg-box-primary': !disabled,
    'border-input-border bg-input-border cursor-not-allowed': disabled,
    'cursor-pointer': !disabled,
  };

  const handleChange = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      <button
        type="button"
        onClick={handleChange}
        disabled={disabled}
        className={cn(baseClasses, customClasses, className)}
      >
        {checked && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-500 rounded-sm" />
          </div>
        )}
      </button>
    </div>
  );
};

export default Checkbox;
