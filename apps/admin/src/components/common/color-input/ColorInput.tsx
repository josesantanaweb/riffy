'use client';
import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { Input } from '@riffy/components';

interface ColorInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  register: UseFormRegister<Record<string, unknown>>;
  name: string;
  error?: FieldError;
  onChange?: (value: string) => void;
  inputSize?: 'sm' | 'md' | 'lg';
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  placeholder = '#000000',
  value = '',
  register,
  name,
  error,
  onChange,
  inputSize = 'md',
}) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-white text-sm">{label}</label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          inputSize={inputSize}
          type="text"
          value={value}
          {...register(name)}
          error={error?.message}
        />
        <input
          type="color"
          value={value || '#000000'}
          onChange={handleColorChange}
          className="absolute right-3 top-2 w-6 h-6 rounded border-0 cursor-pointer opacity-0"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
        />
        <div
          className="absolute right-3 top-2 w-6 h-6 rounded border border-gray-600 cursor-pointer pointer-events-none"
          style={{
            backgroundColor: value || '#000000',
            backgroundImage: value
              ? 'none'
              : 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          }}
        />
      </div>
    </div>
  );
};

export default ColorInput;
