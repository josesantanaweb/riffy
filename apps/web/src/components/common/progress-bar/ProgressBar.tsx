'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps): ReactElement => {
  const progressWidth = `${progress.toFixed(2)}%`;

  return (
    <div className="w-full h-[15px] bg-base-600 rounded-full">
      <div
        className={`h-full rounded-full ${progress === 100 ? 'bg-success-500' : 'bg-primary-500'}`}
        style={{ width: progressWidth }}
      />
    </div>
  );
};

export default ProgressBar;
