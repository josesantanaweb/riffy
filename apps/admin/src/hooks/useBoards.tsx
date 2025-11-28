import { useState, useMemo } from 'react';
import { Board } from '@riffy/types';

export interface UseBoardsProps {
  boards: Board[] | null;
  boardsPerPage?: number;
}

export const useBoards = ({
  boards = [],
  boardsPerPage = 100,
}: UseBoardsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentBoards = useMemo(() => {
    if (!boards || boards.length === 0) return [];

    const startIndex = (currentPage - 1) * boardsPerPage;
    const endIndex = startIndex + boardsPerPage;
    return boards.slice(startIndex, endIndex);
  }, [boards, currentPage, boardsPerPage]);

  const totalPages = Math.ceil((boards?.length || 0) / boardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    currentBoards,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    totalBoards: boards?.length || 0,
  };
};
