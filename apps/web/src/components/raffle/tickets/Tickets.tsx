'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Ticket } from '@riffy/types';
import { useTickets } from '@/hooks';
import Pagination from './pagination';
import Skeleton from './skeleton';
import TicketGrid from './ticket-grid';
import TicketsHeader from './ticket-header';

interface TicketsProps {
  tickets: Ticket[];
  loading: boolean;
  selectedTickets: string[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<string[]>>;
}

const Tickets = ({
  tickets,
  loading,
  selectedTickets,
  setSelectedTickets,
}: TicketsProps): ReactElement => {
  const {
    currentTickets,
    totalPages,
    currentPage,
    sortOrder,
    handleSort,
    nextPage,
    prevPage,
  } = useTickets(tickets);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTickets(prev => {
      const isSelected = prev.includes(ticket.id);
      if (isSelected) {
        return prev.filter(id => id !== ticket.id);
      }
      return [...prev, ticket.id];
    });
  };

  return (
    <div className="flex flex-col gap-3 pb-12">
      <TicketsHeader sortOrder={sortOrder} onSort={handleSort} />

      {loading && <Skeleton />}

      {!loading && (
        <TicketGrid
          tickets={currentTickets}
          selectedTickets={selectedTickets}
          onTicketSelect={handleTicketSelect}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalTickets={tickets?.length || 0}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />
    </div>
  );
};

export default Tickets;
