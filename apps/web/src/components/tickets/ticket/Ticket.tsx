'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Logo } from '@riffy/components';
import { useStore } from '@/store';
import { Ticket as ITicket, Raffle } from '@riffy/types';
import { formatDate } from '@/utils';


interface TicketProps {
  ticket: ITicket;
  raffle: Raffle;
}

const Ticket = ({ ticket, raffle }: TicketProps): ReactElement => {
  const { user } = useStore();

  return (
    <div className="relative">
      <div className="relative bg-base-600 rounded-2xl overflow-hidden">
        <div className="absolute left-0 top-[200px] bg-base-800 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
        <div className="absolute right-0 top-[200px] bg-base-800 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />

        <div className="absolute left-0 right-0 top-[200px] transform -translate-y-1/2 h-0 border-t-2 border-dashed border-base-500">
          <div className="absolute left-0 top-1/2 bg-base-800 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
          <div className="absolute right-0 top-1/2 transform bg-base-800 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />
        </div>

        <div className="p-6 h-[200px] flex items-center justify-center">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Logo className="w-[90px]" src={user?.logo} />
            <h4 className="text-white text-xl font-medium">
              Número #{ticket.number}
            </h4>
          </div>
        </div>

        <div className="p-6 h-[360px] flex items-center justify-center">
          <div className="flex flex-col gap-3 w-full justify-start">
            <div className="flex flex-col gap-1">
              <p className="text-base-200 text-sm">Rifa:</p>
              <h2 className="text-base font-medium text-white">
                {raffle?.title || 'Rifa no disponible'}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base-200 text-sm">Nombre:</p>
              <h2 className="text-base font-medium text-white capitalize">{ticket.payment?.buyerName}</h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base-200 text-sm">Fecha de compra:</p>
              <h2 className="text-base font-medium text-white">
                {formatDate(ticket.payment?.paymentDate)}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base-200 text-sm">Premio:</p>
              <h2 className="text-base font-medium text-white">
                {raffle?.award || 'Premio no disponible'}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[50px] bg-base-600 rounded-2xl absolute -bottom-4 left-1/2 transform -translate-x-1/2" />
      <div className="w-[80%] h-[50px] bg-base-600/60 rounded-2xl absolute -bottom-8 left-1/2 transform -translate-x-1/2" />
    </div>
  );
};

export default Ticket;
