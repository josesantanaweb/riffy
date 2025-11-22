'use client';
import React, { memo, useState } from 'react';

import Number from '../number';
import Letter from '../letter';
import { transposeMatrix } from '../../utils';

interface CardProps {
  numbers: number[][];
  handleBingo: () => void;
}

const Card = memo(({ numbers, handleBingo }: CardProps): React.ReactElement => {
  const [boardNumbers, setBoardNumbers] = useState<number[][]>(
    transposeMatrix(numbers)
  );

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setBoardNumbers((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);

      const currentValue = newBoard[rowIndex][colIndex];
      newBoard[rowIndex][colIndex] =
        currentValue === -1 ? numbers[rowIndex][colIndex] : -1;
      return newBoard;
    });
  };

  return (
    <div className="relative flex flex-col gap-2 items-center bg-base-600 rounded-2xl p-2 border border-line-100">
      <div className="flex items-center justify-center w-full rounded-md p-1 border border-line-100">
        {['B', 'I', 'N', 'G', 'O'].map((letter) => (
          <Letter key={letter} letter={letter} />
        ))}
      </div>
      <div className="relative z-40 grid justify-between w-full grid-cols-5 gap-1 rounded-2xl">
        {boardNumbers.map((row, rowIndex) =>
          row.map((number, colIndex) => (
            <Number
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              number={number}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default Card;
