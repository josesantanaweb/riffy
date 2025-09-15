'use client';
import React from 'react';
import type { ReactElement } from 'react';
import ProgressBar from '../progress-bar';
import { Raffle, RaffleStatus } from '@riffy/types';
import Skeleton from './skeleton';

interface RaffleProgressProps {
  raffle: Raffle;
  loading?: boolean;
}

const RaffleProgress = ({
  raffle,
  loading,
}: RaffleProgressProps): ReactElement => {
  const isCompleted = raffle?.status === RaffleStatus.COMPLETED;
  const displayProgress = isCompleted ? 100 : raffle?.progress;
  const progressText = `${displayProgress}% Completado`;
  const ticketsText = `${raffle?.sold.toLocaleString()}/${raffle?.totalTickets.toLocaleString()}`;

  if (loading) return <Skeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-primary-500 font-medium">{progressText}</p>
        <p className="text-sm text-success-500 font-medium">{ticketsText}</p>
      </div>

      <ProgressBar progress={displayProgress || 0} />
    </div>
  );
};

export default RaffleProgress;
