'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { Button } from '@riffy/components';
import Image from 'next/image';
import Alert from '@/components/common/alert/Alert';
import Tickets from './tickets/Tickets';
import RaffleProgress from '@/components/common/raffle-progress';
import Total from '@/components/common/total';
import { useRaffle } from '@riffy/hooks';
import { Ticket } from '@riffy/types';
import { formatDate } from '@/utils';

const RafflePage = (): ReactElement => {
  const { raffleId } = useParams();
  const { data: raffle, loading } = useRaffle(raffleId as string);
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full h-[340px] relative">
        <Image
          src={raffle?.banner}
          alt="banner"
          width={500}
          height={500}
          className="object-cover w-full h-full hover:scale-105 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2 border-b border-base-500 pb-4">
          <h1 className="text-2xl font-bold text-white">
            {raffle?.title}
          </h1>
        </div>

        <Alert message={formatDate(raffle?.drawDate)} icon="calendar" type="info" />

        {raffle && <RaffleProgress raffle={raffle} />}

        <div className="flex flex-col gap-1 my-3">
          <h2 className="text-lg font-semibold text-white">Lista de Tickets</h2>
          <p className="text-sm text-base-300">
            Seleccione los números de la rifa
          </p>
        </div>

        <Tickets
          tickets={raffle?.tickets || []}
          loading={loading}
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
        />

        <Alert
          message="La compra minima es de 1 ticket "
          icon="info-circle"
          type="warning"
        />

        <Total
          totalTickets={selectedTickets.length}
          price={raffle?.price}
        />

        <Button variant="primary" isFull disabled={selectedTickets.length < 2}>
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default RafflePage;
