'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps): ReactElement => {
  const progressWidth = `${progress.toFixed(2)}%`;

  return (
    <div
      className="w-full h-[15px] bg-box-secondary rounded-full"
      data-testid="progress-bar"
    >
      <motion.div
        className={`h-full rounded-full bg-primary-500`}
        initial={{ width: 0 }}
        animate={{ width: progressWidth }}
        transition={{
          duration: 1,
          delay: 0,
          ease: 'easeOut',
        }}
      />
    </div>
  );
};

export default ProgressBar;
