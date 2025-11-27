'use client';
import React, { memo, useState, useEffect, useRef } from 'react';

import Number from '../number';
import Letter from '../letter';
import {
  checkFullCard,
  checkHorizontalLine,
  checkVerticalLine,
} from '../../utils';
import { useUpdateBoardMarkedNumbers } from '@riffy/hooks';

interface CardProps {
  id: string;
  numbers: number[][];
  markedNumbers?: number[][];
  handleBingo: () => void;
  availableNumbers?: number[];
}

const Card = memo(
  ({
    id,
    numbers,
    markedNumbers,
    handleBingo,
    availableNumbers = [],
  }: CardProps): React.ReactElement => {
    const [boardNumbers, setBoardNumbers] = useState<number[][]>(() => {
      if (markedNumbers) {
        return markedNumbers;
      }
      return numbers.map(row => row.map(num => num));
    });

    const hasBingoBeenCalled = useRef(false);
    const { updateMarkedNumbers } = useUpdateBoardMarkedNumbers();

    useEffect(() => {
      if (markedNumbers) {
        setBoardNumbers(markedNumbers);
      }
    }, [markedNumbers]);

    useEffect(() => {
      const hasFullCard = checkFullCard(boardNumbers);
      const hasHorizontalLine = checkHorizontalLine(boardNumbers);
      const hasVerticalLine = checkVerticalLine(boardNumbers);

      if (
        (hasFullCard || hasHorizontalLine || hasVerticalLine) &&
        !hasBingoBeenCalled.current
      ) {
        hasBingoBeenCalled.current = true;
        handleBingo();
      }
    }, [boardNumbers, handleBingo]);

    const handleCellClick = async (rowIndex: number, colIndex: number) => {
      const cellNumber = numbers[rowIndex][colIndex];
      const currentValue = boardNumbers[rowIndex][colIndex];

      if (!availableNumbers.includes(cellNumber)) {
        return;
      }

      if (currentValue === -1) {
        return;
      }

      const previousBoard = boardNumbers.map(row => [...row]);

      const newBoard = boardNumbers.map(row => [...row]);
      newBoard[rowIndex][colIndex] = -1;

      setBoardNumbers(newBoard);

      try {
        await updateMarkedNumbers(id, newBoard);
      } catch {
        setBoardNumbers(previousBoard);
      }
    };

    const isNumberAvailable = (number: number): boolean => {
      return availableNumbers.includes(number);
    };

    return (
      <div className="relative flex flex-col gap-2 items-center bg-base-600 rounded-2xl p-2 border border-line-100 max-w-[200px]">
        <div className="flex items-center justify-center w-full rounded-md p-1 border border-line-100">
          {['B', 'I', 'N', 'G', 'O'].map(letter => (
            <Letter key={letter} letter={letter} />
          ))}
        </div>
        <div className="relative z-40 grid justify-between w-full grid-cols-5 gap-1 rounded-2xl">
          {boardNumbers.map((row, rowIndex) =>
            row.map((number, colIndex) => {
              const originalNumber = numbers[rowIndex][colIndex];
              const isAvailable = isNumberAvailable(originalNumber);
              const isMarked = number === -1;
              const isDisabled = !isMarked && !isAvailable;

              return (
                <Number
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  number={number}
                  disabled={isDisabled}
                />
              );
            }),
          )}
        </div>
      </div>
    );
  },
);

export default Card;
