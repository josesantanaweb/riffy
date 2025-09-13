'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { Button } from '@riffy/components';
import Alert from '@/components/common/alert/Alert';
import Tickets from './tickets/Tickets';
import RaffleProgress from '@/components/common/raffle-progress';
import Total from '@/components/common/total';
import { useRaffle } from '@riffy/hooks';
import { formatDate } from '@/utils';
import { useStore } from '@/store';
import { RaffleStatus } from '@riffy/types';
import RaffleBanner from '@/components/common/raffle-banner';
import RaffleTitle from '@/components/common/raffle-title';

const RafflePage = (): ReactElement => {
  const { raffleId } = useParams();
  const { data: raffle, loading } = useRaffle(raffleId as string);
  const { setPayment } = useStore();
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  useEffect(() => {
    setPayment({
      buyerName: '',
      phone: '',
      state: null,
      paymentDate: null,
      paymentMethod: '',
      proofUrl: '',
      status: null,
      ticketIds: selectedTickets,
    });
  }, [selectedTickets, setPayment]);

  return (
    <div className="w-full h-full flex flex-col">
      <RaffleBanner
        banner={raffle?.banner}
        isCompleted={raffle?.status === RaffleStatus.COMPLETED}
        loading={loading}
      />
      <div className="flex flex-col gap-5 p-5">
        <RaffleTitle title={raffle?.title} loading={loading} />

        <Alert
          message={formatDate(raffle?.drawDate)}
          icon="calendar"
          type="info"
        />

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

        <Total totalTickets={selectedTickets.length} price={raffle?.price} />

        <Button variant="primary" isFull disabled={selectedTickets.length < 2}>
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default RafflePage;
