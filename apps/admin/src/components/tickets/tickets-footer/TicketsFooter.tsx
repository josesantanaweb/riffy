'use client';

import Pagination from '@/components/common/pagination';

export interface TicketsFooterProps {
  currentPage: number;
  totalPages: number;
  totalTickets: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const TICKET_LEGENDS = [
  {
    color: 'bg-base-200',
    label: 'Boletos Premium',
  },
  {
    color: 'bg-success-500',
    label: 'Boletos Ganadores',
  },
  {
    color: 'bg-danger-500',
    label: 'Boletos Perdedores',
  },
];

const TicketsFooter = ({
  currentPage,
  totalPages,
  totalTickets,
  onPrevPage,
  onNextPage,
}: TicketsFooterProps) => {
  return (
    <div className="flex w-full justify-between items-center flex-col md:flex-row gap-3 md:gap-0">
      <div className="flex items-center gap-5">
        {TICKET_LEGENDS.map(legend => (
          <div key={legend.label} className="flex items-center gap-2">
            <span className={`${legend.color} w-2 h-2 rounded-full flex-shrink-0`} />
            <p className="text-base-300 text-sm">{legend.label}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalTickets={totalTickets}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    </div>
  );
};

export default TicketsFooter;
