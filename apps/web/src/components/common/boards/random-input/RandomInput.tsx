'use client';
import React from 'react';
import type { ReactElement } from 'react';

import NumberInput from '@/components/common/number-input';
import QuickButtons from './quick-buttons';

interface RandomInputProps {
  boardsQuantity: number;
  setBoardsQuantity: (quantity: number) => void;
  minBoards?: number;
  maxBoards?: number;
}

const RandomInput = ({
  boardsQuantity,
  setBoardsQuantity,
  minBoards,
  maxBoards,
}: RandomInputProps): ReactElement => {
  return (
    <div className="flex flex-col gap-6">
      <QuickButtons
        boardsQuantity={boardsQuantity}
        setBoardsQuantity={setBoardsQuantity}
        maxBoards={maxBoards}
      />

      <NumberInput
        value={boardsQuantity}
        setValue={setBoardsQuantity}
        minValue={minBoards}
        maxValue={maxBoards}
      />
    </div>
  );
};

export default RandomInput;
