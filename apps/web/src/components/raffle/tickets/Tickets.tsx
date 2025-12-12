'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

import { Ticket } from '@riffy/types';
import { useTickets } from '@/hooks';
import { selectRandomTickets } from '@/utils';
import TicketPagination from '@/components/common/tickets/ticket-pagination';
import TicketGrid from '@/components/common/tickets/ticket-grid';
import TicketGridFilter from '@/components/common/tickets/ticket-grid-filter';
import RandomInput from '@/components/common/tickets/random-input';
import Skeleton from './Skeleton';

interface TicketsProps {
  tickets: Ticket[];
  loading: boolean;
  selectedTickets: string[];
  isRandomTickets: boolean;
  setSelectedTickets: React.Dispatch<React.SetStateAction<string[]>>;
  setIsRandomTickets?: React.Dispatch<React.SetStateAction<boolean>>;
  minTickets?: number;
  maxTickets?: number;
}

const Tickets = ({
  tickets,
  loading,
  selectedTickets,
  setSelectedTickets,
  isRandomTickets,
  setIsRandomTickets,
  minTickets,
  maxTickets,
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

  const [randomTicketsQuantity, setRandomTicketsQuantity] = useState<number>(
    minTickets || 1,
  );

  useEffect(() => {
    if (isRandomTickets && randomTicketsQuantity > 0 && tickets && tickets.length > 0) {
      const randomTicketIds = selectRandomTickets(tickets, randomTicketsQuantity, true) as string[];
      setSelectedTickets(randomTicketIds);
    }
  }, [isRandomTickets, randomTicketsQuantity, tickets, setSelectedTickets]);

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
      <TicketGridFilter
        sortOrder={sortOrder}
        onSort={handleSort}
        isRandomTickets={isRandomTickets}
        setIsRandomTickets={setIsRandomTickets}
        canToggle={setIsRandomTickets !== undefined}
      />

      {!isRandomTickets && loading && <Skeleton />}

      {isRandomTickets && (
        <RandomInput
          ticketsQuantity={randomTicketsQuantity}
          setTicketsQuantity={setRandomTicketsQuantity}
          minTickets={minTickets}
          maxTickets={maxTickets}
        />
      )}

      {!loading && !isRandomTickets && (
        <>
          <TicketGrid
            tickets={currentTickets}
            selectedTickets={selectedTickets}
            onTicketSelect={handleTicketSelect}
          />
          <TicketPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalTickets={tickets?.length || 0}
            onPrevPage={prevPage}
            onNextPage={nextPage}
          />
        </>
      )}
    </div>
  );
};

export default Tickets;
