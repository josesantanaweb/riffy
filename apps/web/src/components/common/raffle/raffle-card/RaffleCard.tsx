'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon } from '@riffy/components';
import { Raffle, RaffleStatus } from '@riffy/types';
import { ROUTES } from '@/constants/routes';

import RaffleProgress from '@/components/common/raffle/raffle-progress';
import RaffleBanner from '@/components/common/raffle/raffle-banner';
import RaffleMain from '@/components/common/raffle/raffle-main';
import RaffleBoxes from '@/components/common/raffle/raffle-boxes';
import TicketPrize from '@/components/common/tickets/ticket-prize';

interface RaffleCardProps {
  raffle: Raffle;
  loading: boolean;
}

const RaffleCard = ({ raffle, loading }: RaffleCardProps): ReactElement => {
  const router = useRouter();
  const isCompleted = raffle?.status === RaffleStatus.COMPLETED;

  const handleBuyTicket = () => router.push(ROUTES.RAFFLES.RAFFLE(raffle.id));

  const handleVerifyTicket = () =>
    router.push(ROUTES.RAFFLES.VERIFY_TICKET(raffle.id));

  return (
    <div className="flex flex-col bg-box-primary">
      <RaffleBanner
        banner={raffle?.banner}
        isCompleted={raffle?.status === RaffleStatus.COMPLETED}
        loading={loading}
      />

      <div className="flex flex-col gap-5 p-5 w-full">
        <RaffleMain
          title={raffle.title}
          description={raffle.description}
          loading={loading}
        />

        <RaffleBoxes raffle={raffle} loading={loading} />

        <TicketPrize tickets={raffle?.tickets?.slice(20, 23) || []} />

        {raffle.showProgress && <RaffleProgress raffle={raffle} />}

        <div className="flex flex-col gap-3 mt-4">
          {!isCompleted && (
            <Button variant="primary" onClick={handleBuyTicket}>
              Comprar boleto
            </Button>
          )}

          <Button variant="default" onClick={handleVerifyTicket}>
            <Icon name="search" />
            Verificar boleto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RaffleCard;
