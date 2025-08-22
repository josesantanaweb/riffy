'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { CoinEnum } from '@/types/common';
import CoinHistoryItem from './CoinHistoryItem';

interface CoinHistoryProps {
  history: CoinEnum[];
}

const CoinHistory = ({ history }: CoinHistoryProps): React.ReactElement => {
  const maxVisible = 10;
  const visibleHistory = history.slice(-maxVisible);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // if (history.length === 0) {
  //   return <div className="hidden" />;
  // }

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="flex items-center gap-2 flex-wrap "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visibleHistory.map((coin, index) => (
          <CoinHistoryItem
            coin={coin}
            key={`${coin}-${history.length - maxVisible + index}`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CoinHistory;
