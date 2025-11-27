'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface TicketTitleProps {
  isRandomTickets: boolean;
}

const TicketTitle = ({ isRandomTickets }: TicketTitleProps): ReactElement => {
  const title = isRandomTickets ? 'Número de Tickets' : 'Lista de Tickets';
  const subtitle = isRandomTickets ? 'Seleccione la cantidad de tickets' : 'Seleccione los números de la rifa';

  return (
    <div className="flex flex-col gap-1 my-3">
      <h2 className="text-lg font-semibold text-title">
        {title}
      </h2>
      <p className="text-sm text-body-100">
        {subtitle}
      </p>
    </div>
  );
};

export default TicketTitle;
