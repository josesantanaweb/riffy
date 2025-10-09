'use client';
import { useMemo } from 'react';
import TicketBox from '../ticket-box';
import { Ticket } from '@riffy/types';
import TicketsSkeleton from '../tickets-skeleton';

interface TicketsGridProps {
  tickets: Ticket[];
  loading: boolean;
  onSelect: (ticket: Ticket) => void;
  search: string;
}

const TicketsGrid = ({
  tickets,
  loading,
  onSelect,
  search,
}: TicketsGridProps) => {
  const filteredTickets = useMemo(() => {
    if (!search) return tickets;

    return tickets.filter(ticket =>
      ticket.number.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tickets, search]);

  if (loading) {
    return <TicketsSkeleton />;
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-base-300 text-lg">No hay boletos disponibles</p>
      </div>
    );
  }

  if (filteredTickets.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-base-300 text-lg">
          No se encontraron boletos con "{search}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-10 gap-2">
      {filteredTickets.map(ticket => (
        <TicketBox key={ticket.id} ticket={ticket} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default TicketsGrid;
