'use client';
import React from 'react';
import Input from '../input';

interface ColorInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
  inputSize?: 'sm' | 'md' | 'lg';
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  placeholder = '#000000',
  value = '',
  error,
  onChange,
  inputSize = 'md',
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(event.target.value);
  };

  const displayValue = value ?? '';
  const swatchValue = displayValue || '#000000';

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-white text-sm">{label}</label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          inputSize={inputSize}
          type="text"
          value={displayValue}
          onChange={handleTextChange}
          error={error}
        />
        <input
          type="color"
          value={swatchValue}
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
            backgroundColor: swatchValue,
            backgroundImage: displayValue
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
