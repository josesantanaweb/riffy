'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { ProgressBar } from '@riffy/components';
import { Bingo, BingoStatus } from '@riffy/types';

interface BingoProgressProps {
  bingo: Bingo;
  loading?: boolean;
}

const BingoProgress = ({
  bingo,
  loading,
}: BingoProgressProps): ReactElement => {
  const isCompleted = bingo?.status === BingoStatus.COMPLETED;
  const displayProgress = isCompleted ? 100 : bingo?.progress;
  const progressText = `${displayProgress}% Completado`;
  const boardsText = `${bingo?.sold.toLocaleString()}/${bingo?.totalBoards.toLocaleString()}`;

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-box-secondary rounded-md w-20" />
          <div className="h-4 bg-box-secondary rounded-md w-16" />
        </div>
        <div className="w-full h-4 bg-box-secondary rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-medium text-primary-500"
        >
          {progressText}
        </p>
        <p className="text-sm text-white font-medium">{boardsText}</p>
      </div>

      <ProgressBar progress={displayProgress || 0} />
    </div>
  );
};

export default BingoProgress;
