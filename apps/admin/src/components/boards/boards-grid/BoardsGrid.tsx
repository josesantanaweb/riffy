'use client';
import { useMemo } from 'react';
import BoardBox from '../board-box';
import { Board } from '@riffy/types';
import BoardsSkeleton from '../boards-skeleton';

interface BoardsGridProps {
  boards: Board[];
  loading: boolean;
  onSelect: (board: Board) => void;
  search: string;
}

const BoardsGrid = ({
  boards,
  loading,
  onSelect,
  search,
}: BoardsGridProps) => {
  const filteredBoards = useMemo(() => {
    if (!search) return boards;

    return boards.filter(board =>
      board.number.toLowerCase().includes(search.toLowerCase()),
    );
  }, [boards, search]);

  if (loading) {
    return <BoardsSkeleton />;
  }

  if (!boards || boards.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-body-100 text-lg">No hay cartones disponibles</p>
      </div>
    );
  }

  if (filteredBoards.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-body-100 text-lg">
          No se encontraron cartones con "{search}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {filteredBoards.map(board => (
        <BoardBox key={board.id} board={board} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default BoardsGrid;
