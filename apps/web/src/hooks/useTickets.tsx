import { useState, useMemo } from 'react';
import { Ticket } from '@riffy/types';
import { TICKETS_PER_PAGE } from '@/constants';
import { SortOrder } from '@/types';

export const useTickets = (tickets: Ticket[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedTickets = useMemo(() => {
    if (!tickets || !Array.isArray(tickets)) {
      return [];
    }

    return [...tickets].sort((a, b) => {
      const numA = parseInt(a.number);
      const numB = parseInt(b.number);
      return sortOrder === 'asc' ? numA - numB : numB - numA;
    });
  }, [tickets, sortOrder]);

  const currentTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * TICKETS_PER_PAGE;
    const endIndex = startIndex + TICKETS_PER_PAGE;
    return sortedTickets.slice(startIndex, endIndex);
  }, [sortedTickets, currentPage]);

  const totalPages = Math.ceil(sortedTickets.length / TICKETS_PER_PAGE);

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
    currentTickets,
    totalPages,
    currentPage,
    sortOrder,
    handleSort,
    nextPage,
    prevPage,
  };
};
