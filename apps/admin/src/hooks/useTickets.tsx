import { useState, useMemo } from 'react';
import { Ticket } from '@riffy/types';

export interface UseTicketsProps {
  tickets: Ticket[] | null;
  ticketsPerPage?: number;
}

export const useTickets = ({
  tickets = [],
  ticketsPerPage = 100,
}: UseTicketsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTickets = useMemo(() => {
    if (!tickets || tickets.length === 0) return [];

    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    return tickets.slice(startIndex, endIndex);
  }, [tickets, currentPage, ticketsPerPage]);

  const totalPages = Math.ceil((tickets?.length || 0) / ticketsPerPage);

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
    nextPage,
    prevPage,
    totalTickets: tickets?.length || 0,
  };
};
