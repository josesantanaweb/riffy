import { useState, useMemo } from 'react';
import { Board } from '@riffy/types';
import { BOARDS_PER_PAGE } from '@/constants';
import { SortOrder } from '@/types';

export const useBoards = (boards: Board[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedBoards = useMemo(() => {
    if (!boards || !Array.isArray(boards)) {
      return [];
    }

    return [...boards].sort((a, b) => {
      const numA = parseInt(a.number);
      const numB = parseInt(b.number);
      return sortOrder === 'asc' ? numA - numB : numB - numA;
    });
  }, [boards, sortOrder]);

  const currentBoards = useMemo(() => {
    const startIndex = (currentPage - 1) * BOARDS_PER_PAGE;
    const endIndex = startIndex + BOARDS_PER_PAGE;
    return sortedBoards.slice(startIndex, endIndex);
  }, [sortedBoards, currentPage]);

  const totalPages = Math.ceil(sortedBoards.length / BOARDS_PER_PAGE);

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

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
    sortOrder,
    handleSort,
    nextPage,
    prevPage,
  };
};
