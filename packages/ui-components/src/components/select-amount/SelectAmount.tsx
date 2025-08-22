'use client';
import React from 'react';
import NumberInput from '../number-input';
import AmountButton from '../amount-button';

interface SelectAmountProps {
  amount: number;
  setAmount: (amount: number) => void;
  disabled?: boolean;
  maxValue: number;
}

const SelectAmount = ({
  amount,
  setAmount,
  disabled,
  maxValue,
}: SelectAmountProps): React.ReactElement => {
  const predefinedAmounts = [10, 20, 50, 100];

  const handleAmountSelect = (amount: number) => setAmount(amount);

  return (
    <div className="flex flex-col gap-3">
      <NumberInput
        value={amount || 0}
        onChange={setAmount}
        maxValue={maxValue}
        placeholder="0"
        variant="modal"
        disabled={disabled}
        actionsType="min-half-2x"
      />
      <div className="grid grid-cols-4 items-center gap-3">
        {predefinedAmounts.map(predefinedAmount => (
          <AmountButton
            key={predefinedAmount}
            amount={predefinedAmount}
            isSelected={amount === predefinedAmount}
            onClick={handleAmountSelect}
            variant="modal"
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAmount;
