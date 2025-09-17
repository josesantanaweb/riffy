import { cn } from "@/utils";
import { Ticket } from "@riffy/types";

const TicketButton = ({
  ticket,
  isSelected,
  isSold,
  onSelect,
}: {
  ticket: Ticket;
  isSelected: boolean;
  isSold: boolean;
  onSelect: (ticket: Ticket) => void;
}) => {
  const BUTTON_STYLES = {
    base: 'text-sm rounded-md p-2 h-10 flex items-center justify-center transition-colors',
    sold: 'bg-base-700 text-base-300 line-through cursor-not-allowed',
    selected: 'bg-primary-500 text-white hover:bg-primary-600',
    default: 'bg-base-600 text-white hover:bg-base-500',
  } as const;

  const getButtonStyles = {
    base: BUTTON_STYLES.base,
    sold: BUTTON_STYLES.sold,
    selected: BUTTON_STYLES.selected,
    default: BUTTON_STYLES.default,
  }

  const buttonStyles = cn(getButtonStyles.base, getButtonStyles[isSold ? 'sold' : isSelected ? 'selected' : 'default']);

  return (
    <button
      onClick={() => onSelect(ticket)}
      disabled={isSold}
      className={buttonStyles}
    >
      {ticket.number}
    </button>
  );
};

export default TicketButton;
