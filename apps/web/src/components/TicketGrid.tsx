'use client';
import React, { useMemo, useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@/icons';

type TicketStatus = 'available' | 'sold out' | 'selected';

interface Ticket {
  id: number;
  number: string;
  status: TicketStatus;
}

const TICKETS_TOTAL = 10000;
const PAGE_SIZE = 36;
const COLUMNS = 6;

// Simulate some sold out tickets for demo
const getInitialTickets = (): Ticket[] => {
  return Array.from({ length: TICKETS_TOTAL }, (_, i) => {
    let status: TicketStatus = 'available';
    if (i % 19 === 3 || i % 17 === 6) status = 'sold out';
    return {
      id: i,
      number: (i + 1).toString().padStart(4, '0'),
      status,
    };
  });
};

export default function TicketGrid() {
  const [tickets, setTickets] = useState<Ticket[]>(getInitialTickets());
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const pageCount = Math.ceil(TICKETS_TOTAL / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageTickets = useMemo(
    () => tickets.slice(start, end),
    [tickets, start, end],
  );

  const handleSelect = (ticket: Ticket) => {
    if (ticket.status === 'sold out') return;
    setTickets(prev =>
      prev.map(t =>
        t.id === ticket.id
          ? {
              ...t,
              status: t.status === 'selected' ? 'available' : 'selected',
            }
          : t,
      ),
    );
    setSelected(prev => {
      const next = new Set(prev);
      if (ticket.status === 'selected') {
        next.delete(ticket.id);
      } else {
        next.add(ticket.id);
      }
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-6 gap-2 w-full mb-2">
        {pageTickets.map(ticket => (
          <div
            key={ticket.id}
            className={
              `py-2 px-7 flex items-center justify-center rounded-[5px] font-semibold text-base transition-all ` +
              (ticket.status === 'sold out'
                ? 'bg-tertiary-1 text-gray-2 cursor-not-allowed'
                : ticket.status === 'selected'
                  ? 'bg-primary-1 text-white'
                  : 'bg-tertiary-1 text-white')
            }
            onClick={() => handleSelect(ticket)}
          >
            {ticket.number}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-between px-2 mb-2">
        <span className="text-primary-1 text-sm font-semibold">
          {selected.size} Tickets seleccionados
        </span>
        <div className="flex gap-2">
          <button
            className="bg-tertiary-1 text-white rounded-[5px] px-3 py-2 disabled:opacity-50"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <IconChevronLeft size={16} />
          </button>
          <button
            className="bg-tertiary-1 text-white rounded-[5px] px-2 py-1 disabled:opacity-50"
            onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
