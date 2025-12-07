'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Logo } from '@riffy/components';
import Image from 'next/image';
import { useStore } from '@/store';
import { formatDateTime } from '@riffy/utils';
import { Ticket as ITicket, Raffle } from '@riffy/types';

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
          color: 'text-warning-500',
          bgColor: 'bg-box-primary',
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
          color: 'text-body-100',
          bgColor: 'bg-box-secondary',
        };
      case 'available':
        return {
          text: 'Disponible',
          color: 'text-body-100',
          bgColor: 'bg-box-primary',
        };
      default:
        return {
          text: status,
          color: 'text-body-100',
          bgColor: 'bg-box-primary',
        };
    }
  };

  const ticketStatus = getTicketStatus(ticket.status);

  return (
    <div
      className="relative bg-box-secondary rounded-2xl overflow-hidden w-full mx-auto"
      data-ticket-id={ticket.id}
    >
      <div className="absolute left-0 top-[200px] bg-box-primary transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
      <div className="absolute right-0 top-[200px] bg-box-primary transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />

      <div className="absolute left-0 right-0 top-[200px] transform -translate-y-1/2 h-0 border-t-2 border-dashed border-line-100">
        <div className="absolute left-0 top-1/2 bg-box-primary transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
        <div className="absolute right-0 top-1/2 transform bg-box-primary -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />
      </div>

      <div className="p-6 h-[200px] flex items-center justify-center relative">
        <div className="flex items-center justify-center">
          <Logo
            className="w-[90px]"
            src={user?.logo}
            isRounded={user?.isRoundedLogo}
          />
        </div>
      </div>



      <div className="p-6 h-[310px] flex items-center flex-col">
        <div className="flex flex-col gap-6 w-full justify-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 overflow-hidden rounded-lg shrink-0">
              <Image
                src={raffle?.banner}
                alt={raffle?.title}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-body-100 text-sm">Rifa:</p>
              <h2 className="text-base font-medium text-title line-clamp-1">
                {raffle?.title || 'Rifa no disponible'}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-body-100 text-sm">Nombre:</p>
              <h2 className="text-base font-medium text-title capitalize">
                {ticket.payment?.buyerName}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-body-100 text-sm">Cedula:</p>
              <h2 className="text-base font-medium text-title capitalize">
                {ticket.payment?.nationalId}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-body-100 text-sm">Fecha de compra:</p>
              <h2 className="text-base font-medium text-title">
                {formatDateTime(ticket.payment?.paymentDate)}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-body-100 text-sm">Estado:</p>
              <h2 className={`text-base font-medium ${ticketStatus.color}`}>
                {ticketStatus.text}
              </h2>
            </div>
          </div>
          <div className="bg-primary-500/10 flex items-center justify-center absolute bottom-0 left-0 right-0 w-full py-4">
            <h2 className="text-2xl font-bold text-title text-center">
              #{ticket.number}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
