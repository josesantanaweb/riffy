'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Ticket } from '@riffy/types';
import { useTickets } from '@/hooks';
import { selectRandomTickets } from '@/utils';
import Skeleton from './skeleton';
import TicketsHeader from './ticket-header';
import TicketPagination from '../../common/tickets/ticket-pagination';
import TicketGrid from '../../common/tickets/ticket-grid';
import RandomInput from '../../common/tickets/random-input';

interface TicketsProps {
  tickets: Ticket[];
  loading: boolean;
  selectedTickets: string[];
  isRandomTickets: boolean;
  setSelectedTickets: React.Dispatch<React.SetStateAction<string[]>>;
  setIsRandomTickets: React.Dispatch<React.SetStateAction<boolean>>;
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

  const handleRandomTicket = (quantity: number) => {
    const randomTicketIds = selectRandomTickets(tickets, quantity, true) as string[];
    setSelectedTickets(randomTicketIds);
  };

  useEffect(() => {
    if (isRandomTickets && randomTicketsQuantity > 0) {
      handleRandomTicket(randomTicketsQuantity);
    }
  }, [isRandomTickets, randomTicketsQuantity, tickets]);

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
      <TicketsHeader
        sortOrder={sortOrder}
        onSort={handleSort}
        isRandomTickets={isRandomTickets}
        setIsRandomTickets={setIsRandomTickets}
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
