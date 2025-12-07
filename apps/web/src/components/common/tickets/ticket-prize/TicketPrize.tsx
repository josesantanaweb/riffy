'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Ticket } from '@riffy/types';

interface TicketPrizeProps {
  tickets: Ticket[];
}

const TicketPrize = ({ tickets }: TicketPrizeProps): ReactElement => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold text-title">Tickets Premiados</h2>
      <div className="flex items-center gap-3">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-box-secondary rounded-md px-2 py-1 text-title text-sm"
          >
            {ticket.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketPrize;
