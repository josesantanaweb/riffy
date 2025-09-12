'use client';
import React, { useState, useMemo } from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { Ticket, TicketStatus } from '@riffy/types';
import Skeleton from './skeleton';

interface TicketsProps {
  tickets: Ticket[];
  loading: boolean;
  selectedTickets: Ticket[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const Tickets = ({
  tickets,
  loading,
  selectedTickets,
  setSelectedTickets,
}: TicketsProps): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const ticketsPerPage = 40;

  const currentTickets = useMemo(() => {
    if (!tickets || !Array.isArray(tickets)) {
      return [];
    }

    const sortedTickets = [...tickets].sort((a, b) => {
      const numA = parseInt(a.number);
      const numB = parseInt(b.number);
      return sortOrder === 'asc' ? numA - numB : numB - numA;
    });

    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    return sortedTickets.slice(startIndex, endIndex);
  }, [tickets, currentPage, ticketsPerPage, sortOrder]);

  const totalPages =
    tickets && Array.isArray(tickets)
      ? Math.ceil(tickets.length / ticketsPerPage)
      : 0;

  const handleTicket = (ticket: Ticket) => {
    setSelectedTickets(prev => {
      const isSelected = prev.some(selected => selected.id === ticket.id);
      if (isSelected) {
        return prev.filter(selected => selected.id !== ticket.id);
      } else {
        return [...prev, ticket];
      }
    });
  };

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name="shuffle" className="text-xl text-base-300" />
          <h2 className="text-base font-medium text-white">Modo Aleatorio</h2>
        </div>
        <button
          className="flex items-center gap-2"
          onClick={() => handleSort()}
        >
          <h2 className="text-base font-medium text-white">Ordenar:</h2>
          <Icon
            name="sort"
            className={`text-xl text-base-300 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {loading && <Skeleton />}

      {!loading && (
        <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-[300px]">
          {currentTickets.map(ticket => {
            const isSelected = selectedTickets.some(
              selected => selected.id === ticket.id,
            );
            const isSold = ticket.status === TicketStatus.SOLD;

            return (
              <button
                onClick={() => handleTicket(ticket)}
                disabled={isSold}
                key={ticket.id}
                className={`
                  text-sm rounded-md p-2 h-10 flex items-center justify-center transition-colors
                  ${
                    isSold
                      ? 'bg-base-700 text-base-300 line-through cursor-not-allowed'
                      : isSelected
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-base-600 text-white hover:bg-base-500'
                  }
                `}
              >
                {ticket.number}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="text-base-300">
            Página {currentPage} de {totalPages}
          </span>
          <span className="text-base font-medium text-primary-500">
            Total: {tickets?.length || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`gap-2 bg-base-600 rounded-md p-2 w-10 h-10 flex items-center justify-center rotate-90 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-base-300' : 'hover:bg-primary-500 text-white'}`}
          >
            <Icon name="chevron-down" className="text-xl" />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`gap-2 bg-base-600 rounded-md p-2 w-10 h-10 flex items-center justify-center -rotate-90 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-base-300' : 'hover:bg-primary-500 text-white'}`}
          >
            <Icon name="chevron-down" className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
