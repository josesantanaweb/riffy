'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Button } from '@riffy/components';

interface QuickButtonsProps {
  boardsQuantity: number;
  setBoardsQuantity: (quantity: number) => void;
  minBoards?: number;
  maxBoards?: number;
}

const QuickButtons = ({
  boardsQuantity,
  setBoardsQuantity,
  maxBoards,
}: QuickButtonsProps): ReactElement => {
  const quickButtons = [
    { label: '2 Boards', value: 2 },
    { label: '5 Boards', value: 5 },
    { label: '10 Boards', value: 10 },
  ];

  return (
    <div className="flex items-center w-full justify-between">
      {quickButtons.map(({ label, value }) => (
        <Button
          key={value}
          variant={boardsQuantity === value ? 'primary' : 'default'}
          size="lg"
          className="capitalize"
          onClick={() => setBoardsQuantity(value)}
          disabled={value > (maxBoards || 100)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default QuickButtons;
