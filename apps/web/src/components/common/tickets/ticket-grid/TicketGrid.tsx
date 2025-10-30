import { Ticket, TicketStatus } from '@riffy/types';
import TicketButton from '../ticket-button';

interface TicketGridProps {
  tickets: Ticket[];
  selectedTickets: string[];
  onTicketSelect: (ticket: Ticket) => void;
}

const TicketGrid = ({
  tickets,
  selectedTickets,
  onTicketSelect,
}: TicketGridProps) => (
  <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-[300px] scrollbar-transparent">
    {tickets.map(ticket => {
      const isSelected = selectedTickets.includes(ticket.id);
      const isNotAvailable =
        ticket.status === TicketStatus.SOLD ||
        ticket.status === TicketStatus.PREMIUM ||
        ticket.status === TicketStatus.WINNER

      return (
        <TicketButton
          key={ticket.id}
          ticket={ticket}
          isSelected={isSelected}
          isNotAvailable={isNotAvailable}
          onSelect={onTicketSelect}
        />
      );
    })}
  </div>
);

export default TicketGrid;
