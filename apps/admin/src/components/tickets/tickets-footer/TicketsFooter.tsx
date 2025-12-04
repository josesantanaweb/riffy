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
    color: 'bg-primary-500/30',
    label: 'Vendidos',
  },
  {
    color: 'bg-success-500',
    label: 'Ganadores',
  },
  {
    color: 'bg-box-secondary',
    label: 'Disponibles',
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
            <span className={`${legend.color} w-2 h-2 rounded-full shrink-0`} />
            <p className="text-body-100 text-xs">{legend.label}</p>
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
