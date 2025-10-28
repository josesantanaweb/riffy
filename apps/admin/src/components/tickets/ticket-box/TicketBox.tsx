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
        return 'bg-box-secondary text-body-100';
      case TicketStatus.SOLD:
        return 'box-secondary text-body-100 line-through';
      case TicketStatus.WINNER:
        return 'bg-success-500/70 text-white';
      case TicketStatus.LOSER:
        return 'bg-danger-500/70 text-white';
      case TicketStatus.PREMIUM:
        return 'bg-box-primary text-white';
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
