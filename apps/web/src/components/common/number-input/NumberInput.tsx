'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Button, Icon } from '@riffy/components';

interface NumberInputProps {
  value: number;
  setValue: (value: number) => void;
  minValue?: number;
  maxValue?: number;
}

const NumberInput = ({
  value,
  setValue,
  minValue,
  maxValue,
}: NumberInputProps): ReactElement => {
  const increment = () => {
    setValue(Math.min(value + 1, maxValue || 100));
  };

  const decrement = () => {
    setValue(Math.max(value - 1, minValue || 1));
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="default"
        size="lg"
        className="w-12 h-12"
        onClick={decrement}
        disabled={value <= (minValue || 1)}
      >
        <Icon name="minus" className="text-2xl" />
      </Button>
      <div className="text-white text-lg bg-box-secondary rounded-md w-full h-12 flex items-center justify-center">
        {value}
      </div>
      <Button
        variant="default"
        size="lg"
        className="w-12 h-12"
        onClick={increment}
        disabled={value >= (maxValue || 100)}
      >
        <Icon name="plus" className="text-2xl" />
      </Button>
    </div>
  );
};

export default NumberInput;
