'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

const Switch = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  label,
}: SwitchProps): ReactElement => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

    return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`
        relative inline-flex h-[25px] w-[45px] items-center rounded-full
        transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? 'bg-success-500' : 'bg-base-500'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      >
        <span
          className={`
          inline-block h-4 w-4 transform rounded-full bg-white
          transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
        />
       </button>
       {label && (
         <label
           className="text-base text-white cursor-pointer select-none"
           onClick={handleClick}
         >
           {label}
         </label>
       )}
    </div>
  );
};

export default Switch;
