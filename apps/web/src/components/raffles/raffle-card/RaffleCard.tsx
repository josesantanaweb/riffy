'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon } from '@riffy/components';
import Alert from '@/components/common/alert';
import RaffleProgress from '@/components/common/raffle-progress';
import type { ReactElement } from 'react';
import { Raffle, RaffleStatus } from '@riffy/types';
import { formatDate } from '@/utils';
import { ROUTES } from '@/constants/routes';
import RaffleBanner from '@/components/common/raffle-banner';
import RaffleTitle from '@/components/common/raffle-title';

interface RaffleCardProps {
  raffle: Raffle;
  loading: boolean;
}

const RaffleCard = ({ raffle, loading }: RaffleCardProps): ReactElement => {
  const router = useRouter();
  const isCompleted = raffle.status === RaffleStatus.COMPLETED;

  const handleBuyTicket = () => router.push(ROUTES.RAFFLES.RAFFLE(raffle.id));

  return (
    <div className="flex flex-col bg-base-700 rounded-xl overflow-hidden">
      <RaffleBanner
        banner={raffle?.banner}
        isCompleted={raffle?.status === RaffleStatus.COMPLETED}
        loading={loading}
      />

      <div className="flex flex-col gap-5 p-5">
        <RaffleTitle title={raffle.title} loading={loading} />

        <Alert
          message={!isCompleted ? formatDate(raffle.drawDate) : 'Completada'}
          icon="calendar"
          type={!isCompleted ? undefined : 'success'}
        />

        <RaffleProgress raffle={raffle} />

        <div className="flex flex-col gap-3 mt-4">
          {!isCompleted && (
            <Button variant="primary" onClick={handleBuyTicket}>
              Comprar boleto
            </Button>
          )}

          <Button variant="default">
            <Icon name="search" />
            Verificar boleto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RaffleCard;
