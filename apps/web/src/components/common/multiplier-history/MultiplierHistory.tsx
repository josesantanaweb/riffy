'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultEnum } from '@/types/common';

export interface IMultiplierHistory {
  value: number;
  result: ResultEnum;
}

interface MultiplierHistoryProps {
  multiplierHistory: IMultiplierHistory[];
}

const MultiplierItem = ({ item }: { item: IMultiplierHistory }) => {
  const className =
    item.result === ResultEnum.WIN
      ? 'bg-green-500 text-white'
      : 'bg-base-600 text-white';
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: 0.4,
      }}
      className={`flex items-center justify-center rounded-lg h-8 px-3 text-sm font-medium ${className}`}
      aria-label={`Multiplier: x${item.value.toFixed(2)}`}
    >
      x{item.value.toFixed(2)}
    </motion.div>
  );
};

const MultiplierHistory = ({
  multiplierHistory,
}: MultiplierHistoryProps): React.ReactElement => {
  const lastMultipliers = multiplierHistory.slice(-5);

  return (
    <div
      className={`flex items-center ${lastMultipliers.length > 4 ? 'justify-between' : 'justify-start gap-3'}`}
    >
      <AnimatePresence>
        {lastMultipliers.map((item, index) => (
          <MultiplierItem key={index} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MultiplierHistory;
