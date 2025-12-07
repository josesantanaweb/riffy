'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@riffy/components';
import { useIsIPhone } from '@riffy/hooks';
import Alert from '@/components/common/alert';
import Tickets from './tickets/Tickets';
import RaffleProgress from '@/components/common/raffle/raffle-progress';
import TotalBox from '@/components/payment/payment-total';
import { useRaffle } from '@riffy/hooks';
import { useStore } from '@/store';
import { ROUTES } from '@/constants';
import { RaffleStatus } from '@riffy/types';
import RaffleBanner from '@/components/common/raffle/raffle-banner';
import RaffleTitle from '@/components/common/raffle/raffle-title';
import TicketTitle from '@/components/common/tickets/ticket-title';
import TicketPrize from '@/components/common/tickets/ticket-prize';
import RaffleInfoBoxes from '@/components/common/raffle/raffle-boxes';

const RafflePage = (): ReactElement => {
  const router = useRouter();
  const isIPhone = useIsIPhone();
  const { raffleId } = useParams();
  const { setCart } = useStore();
  const { data: raffle, loading } = useRaffle(raffleId as string);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [isRandomTickets, setIsRandomTickets] = useState<boolean>(true);

  useEffect(() => {
    setCart({
      ticketIds: selectedTickets,
      amount: (raffle?.price || 0) * selectedTickets.length,
      price: raffle?.price || 0,
      totalTickets: selectedTickets.length,
      raffleTitle: raffle?.title,
      raffleId: raffle?.id,
    });
  }, [selectedTickets, setCart, raffle]);

  useEffect(() => {
    setSelectedTickets([]);
  }, [isRandomTickets]);

  const handlePay = () => router.push(ROUTES.PAYMENT);

  return (
    <div className={`w-full h-full flex flex-col ${isIPhone ? 'pb-16' : ''}`}>
      <RaffleBanner
        banner={raffle?.banner}
        isCompleted={raffle?.status === RaffleStatus.COMPLETED}
        loading={loading}
      />
      <div className="flex flex-col gap-5 p-5 bg-box-primary">
        <RaffleTitle title={raffle?.title} loading={loading} />

        <RaffleInfoBoxes raffle={raffle} loading={loading} />

        <TicketPrize tickets={raffle?.tickets.slice(20, 23) || []} />

        {raffle?.showProgress && <RaffleProgress raffle={raffle} />}

        <TicketTitle isRandomTickets={isRandomTickets} />

        <Tickets
          tickets={raffle?.tickets || []}
          loading={loading}
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
          isRandomTickets={isRandomTickets}
          setIsRandomTickets={setIsRandomTickets}
          minTickets={raffle?.minTickets}
          maxTickets={raffle?.maxTickets}
        />

        <Alert
          message={`La compra minima es de ${raffle?.minTickets} tickets`}
          icon="info-circle"
          type="warning"
        />

        <div className="w-full max-w-md py-5 flex flex-col gap-3">
          <TotalBox
            totalTickets={selectedTickets.length}
            price={raffle?.price}
          />

          <Button
            variant="primary"
            isFull
            disabled={selectedTickets.length < raffle?.minTickets}
            onClick={handlePay}
          >
            Pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RafflePage;
