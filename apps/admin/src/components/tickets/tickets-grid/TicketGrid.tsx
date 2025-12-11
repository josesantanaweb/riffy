'use client';
import TicketBox from '../ticket-box';
import { Ticket } from '@riffy/types';
import TicketsSkeleton from '../tickets-skeleton';

interface TicketsGridProps {
  tickets: Ticket[];
  loading: boolean;
  onSelect: (ticket: Ticket) => void;
}

const TicketsGrid = ({
  tickets,
  loading,
  onSelect,
}: TicketsGridProps) => {
  if (loading) {
    return <TicketsSkeleton />;
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-body-100 text-lg">
          No hay tickets disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {tickets.map(ticket => (
        <TicketBox key={ticket.id} ticket={ticket} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default TicketsGrid;
