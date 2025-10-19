'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Logo } from '@riffy/components';
import { useStore } from '@/store';
import { Ticket as ITicket, Raffle } from '@riffy/types';
import { formatDate } from '@/utils';
import Image from 'next/image';

interface TicketProps {
  ticket: ITicket;
  raffle: Raffle;
}

const Ticket = ({ ticket, raffle }: TicketProps): ReactElement => {
  const { user } = useStore();

  const getTicketStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sold':
        return {
          text: 'Pendiente',
          color: 'text-base-300',
          bgColor: 'bg-base-300/20',
        };
      case 'winner':
        return {
          text: 'Ganador',
          color: 'text-success-500',
          bgColor: 'bg-success/20',
        };
      case 'loser':
        return {
          text: 'Perdedor',
          color: 'text-danger-500',
          bgColor: 'bg-danger/20',
        };
      case 'premium':
        return {
          text: 'Premium',
          color: 'text-base-300',
          bgColor: 'bg-base-300/20',
        };
      case 'available':
        return {
          text: 'Disponible',
          color: 'text-base-300',
          bgColor: 'bg-base-300/20',
        };
      default:
        return {
          text: status,
          color: 'text-base-300',
          bgColor: 'bg-base-300/20',
        };
    }
  };

  const ticketStatus = getTicketStatus(ticket.status);

  return (
    <div className="relative flex flex-col gap-3 items-center">
      <div
        className="relative dark:bg-base-700 bg-base-700 rounded-2xl overflow-hidden w-full"
        data-ticket-id={ticket.id}
      >
        <div className="absolute left-0 top-[200px] bg-base-800 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
        <div className="absolute right-0 top-[200px] bg-base-800 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />

        <div className="absolute left-0 right-0 top-[200px] transform -translate-y-1/2 h-0 border-t-2 border-dashed border-base-500">
          <div className="absolute left-0 top-1/2 bg-base-800 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
          <div className="absolute right-0 top-1/2 transform bg-base-800 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />
        </div>

        <div className="p-6 h-[200px] flex items-center justify-center relative">
          <div className="flex items-center justify-center absolute h-[25px] px-3 right-5 top-5 bg-base-600 rounded-lg p-2">
            <h4 className="dark:text-white text-primary text-sm font-medium">#{ticket.number}</h4>
          </div>
          <div className="flex items-center justify-center">
            <Logo className="w-[90px]" src={user?.logo} />
          </div>
        </div>

        <div className="p-6 h-[310px] flex items-center flex-col">
          <div className="flex flex-col gap-6 w-full justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden rounded-lg flex-shrink-0">
                <Image
                  src={raffle?.banner}
                  alt={raffle?.title}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base-200 text-sm">Rifa:</p>
                <h2 className="text-base font-medium dark:text-white text-primary line-clamp-1">
                  {raffle?.title || 'Rifa no disponible'}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-base-200 text-sm">Nombre:</p>
                <h2 className="text-base font-medium dark:text-white text-primary-500 capitalize">
                  {ticket.payment?.buyerName}
                </h2>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base-200 text-sm">Cedula:</p>
                <h2 className="text-base font-medium dark:text-white text-primary-500 capitalize">
                  {ticket.payment?.nationalId}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-base-200 text-sm">Precio:</p>
                <h2 className="text-base font-medium dark:text-white text-primary-500 capitalize">
                  {ticket.payment?.amount}
                </h2>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base-200 text-sm">Estado:</p>
                <h2 className={`text-base font-medium ${ticketStatus.color}`}>
                  {ticketStatus.text}
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base-200 text-sm">Fecha de compra:</p>
              <h2 className="text-base font-medium dark:text-white text-primary-500">
                {formatDate(ticket.payment?.paymentDate)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
