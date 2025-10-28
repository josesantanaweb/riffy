'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  delay?: number;
}

const ProgressBar = ({ progress, delay = 0 }: ProgressBarProps): ReactElement => {
  return (
    <div className="w-full h-[15px] bg-box-secondary rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-primary-500`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 1,
          delay,
          ease: 'easeOut',
        }}
      />
    </div>
  );
};

export default ProgressBar;
