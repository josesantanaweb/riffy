'use client';
import React from 'react';
import type { ReactElement } from 'react';
import ProgressBar from '../progress-bar';
import { Raffle, RaffleStatus } from '@riffy/types';

interface RaffleProgressProps {
  raffle: Raffle;
}

const RaffleProgress = ({ raffle }: RaffleProgressProps): ReactElement => {
  const { progress, sold, totalTickets, status } = raffle;
  const isCompleted = status === RaffleStatus.COMPLETED;

  const displayProgress = isCompleted ? 100 : progress;
  const progressText = `${displayProgress}% Completado`;
  const ticketsText = `${sold.toLocaleString()}/${totalTickets.toLocaleString()}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-primary-500 font-medium">
          {progressText}
        </p>
        <p className="text-sm text-success-500 font-medium">
          {ticketsText}
        </p>
      </div>

      <ProgressBar progress={displayProgress} />
    </div>
  );
};

export default RaffleProgress;
