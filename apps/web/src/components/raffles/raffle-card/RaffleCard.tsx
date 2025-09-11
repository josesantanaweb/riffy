'use client';
import React from 'react';
import Image from 'next/image';
import { Button, Icon } from '@riffy/components';
import Alert from '@/components/common/alert';
import RaffleProgress from '@/components/common/raffle-progress';
import type { ReactElement } from 'react';
import { Raffle, RaffleStatus } from '@riffy/types';
import { formatDate } from '@/utils';

interface RaffleCardProps {
  raffle: Raffle;
}

const RaffleCard = ({ raffle }: RaffleCardProps): ReactElement => {
  const isCompleted = raffle.status === RaffleStatus.COMPLETED;

  return (
    <div className="flex flex-col bg-base-700 rounded-xl overflow-hidden">
      <div
        className={`w-full h-[340px] relative  ${isCompleted ? 'saturate-0' : ''}`}
      >
        <Image
          src={raffle.banner}
          alt={raffle.title}
          width={500}
          height={500}
          className="object-cover w-full h-full hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2 border-b border-base-500 pb-4">
          <h1 className="text-2xl font-bold text-white">{raffle.title}</h1>
        </div>

        <Alert
          message={!isCompleted ? formatDate(raffle.drawDate) : 'Completada'}
          icon="calendar"
          type={!isCompleted ? undefined : 'success'}
        />

        <RaffleProgress raffle={raffle} />

        <div className="flex flex-col gap-3 mt-4">
          {!isCompleted && <Button variant="primary">Comprar boleto</Button>}

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
