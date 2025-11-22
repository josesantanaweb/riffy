'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

import { Board } from '@riffy/types';
import { useBoards } from '@/hooks';
import { selectRandomBoards } from '@/utils';
import BoardPagination from '@/components/common/boards/board-pagination';
import BoardGrid from '@/components/common/boards/board-grid';
import BoardGridFilter from '@/components/common/boards/board-grid-filter';
import RandomInput from '@/components/common/boards/random-input';
import Skeleton from './Skeleton';

interface BoardsProps {
  boards: Board[];
  loading: boolean;
  selectedBoards: string[];
  isRandomBoards: boolean;
  setSelectedBoards: React.Dispatch<React.SetStateAction<string[]>>;
  setIsRandomBoards: React.Dispatch<React.SetStateAction<boolean>>;
  minBoards?: number;
  maxBoards?: number;
}

const Boards = ({
  boards,
  loading,
  selectedBoards,
  setSelectedBoards,
  isRandomBoards,
  setIsRandomBoards,
  minBoards,
  maxBoards,
}: BoardsProps): ReactElement => {
  const {
    currentBoards,
    totalPages,
    currentPage,
    sortOrder,
    handleSort,
    nextPage,
    prevPage,
  } = useBoards(boards);

  const [randomBoardsQuantity, setRandomBoardsQuantity] = useState<number>(
    minBoards || 1,
  );

  const handleRandomBoard = (quantity: number) => {
    const randomBoardIds = selectRandomBoards(boards, quantity, true) as string[];
    setSelectedBoards(randomBoardIds);
  };

  useEffect(() => {
    if (isRandomBoards && randomBoardsQuantity > 0) {
      handleRandomBoard(randomBoardsQuantity);
    }
  }, [isRandomBoards, randomBoardsQuantity, boards]);

  const handleBoardSelect = (board: Board) => {
    setSelectedBoards(prev => {
      const isSelected = prev.includes(board.id);
      if (isSelected) {
        return prev.filter(id => id !== board.id);
      }
      return [...prev, board.id];
    });
  };

  return (
    <div className="flex flex-col gap-3 pb-12">
      <BoardGridFilter
        sortOrder={sortOrder}
        onSort={handleSort}
        isRandomBoards={isRandomBoards}
        setIsRandomBoards={setIsRandomBoards}
      />

      {!isRandomBoards && loading && <Skeleton />}

      {isRandomBoards && (
        <RandomInput
          boardsQuantity={randomBoardsQuantity}
          setBoardsQuantity={setRandomBoardsQuantity}
          minBoards={minBoards}
          maxBoards={maxBoards}
        />
      )}

      {!loading && !isRandomBoards && (
        <>
          <BoardGrid
            boards={currentBoards}
            selectedBoards={selectedBoards}
            onBoardSelect={handleBoardSelect}
          />
          <BoardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalBoards={boards?.length || 0}
            onPrevPage={prevPage}
            onNextPage={nextPage}
          />
        </>
      )}
    </div>
  );
};

export default Boards;
