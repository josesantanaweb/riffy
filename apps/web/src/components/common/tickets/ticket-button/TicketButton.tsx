import { cn } from '@riffy/utils';
import { Ticket } from "@riffy/types";

const TicketButton = ({
  ticket,
  isSelected,
  isNotAvailable,
  onSelect,
}: {
  ticket: Ticket;
  isSelected: boolean;
  isNotAvailable: boolean;
  onSelect: (ticket: Ticket) => void;
}) => {
  const BUTTON_STYLES = {
    base: 'text-sm rounded-md p-2 h-10 flex items-center justify-center transition-colors',
    sold: 'bg-primary-500/30 text-white line-through cursor-not-allowed',
    selected: 'bg-primary-500 text-white hover:bg-primary-600',
    default: 'bg-box-secondary text-body-100 hover:bg-box-secondary/50',
  } as const;

  const getButtonStyles = {
    base: BUTTON_STYLES.base,
    sold: BUTTON_STYLES.sold,
    selected: BUTTON_STYLES.selected,
    default: BUTTON_STYLES.default,
  }

  const buttonStyles = cn(getButtonStyles.base, getButtonStyles[isNotAvailable ? 'sold' : isSelected ? 'selected' : 'default']);

  return (
    <button
      onClick={() => onSelect(ticket)}
      disabled={isNotAvailable}
      className={buttonStyles}
    >
      {ticket.number}
    </button>
  );
};

export default TicketButton;
