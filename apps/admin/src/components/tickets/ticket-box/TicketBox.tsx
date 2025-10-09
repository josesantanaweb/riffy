'use client';
import { Ticket, TicketStatus } from '@riffy/types';

interface TicketBoxProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
}

const TicketBox = ({ ticket, onSelect }: TicketBoxProps) => {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.AVAILABLE:
        return 'bg-base-600 text-white hover:bg-base-600/50';
      case TicketStatus.SOLD:
        return 'bg-base-600 text-base-300 hover:bg-base-600/50 line-through';
      case TicketStatus.WINNER:
        return 'bg-success-500/30 text-white hover:bg-success-500/50';
      case TicketStatus.LOSER:
        return 'bg-danger-500/30 text-white hover:bg-danger-500/50';
      case TicketStatus.PREMIUM:
        return 'bg-base-200/30 text-white hover:bg-base-200/50';
      default:
        return 'text-white';
    }
  };

  return (
    <div
      key={ticket.id}
      className={`h-12 flex items-center text-base font-medium justify-center rounded-md p-2 cursor-pointer transition-colors ${getStatusColor(ticket.status as TicketStatus)}`}
      onClick={() => onSelect(ticket)}
    >
      {ticket.number}
    </div>
  );
};

export default TicketBox;
