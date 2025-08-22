'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CoinEnum } from '@/types/common';
import { getCoinImage, getCoinName } from '@/components/coinflip/utils';

interface CoinHistoryItemProps {
  coin: CoinEnum;
}

const CoinHistoryItem = ({
  coin,
}: CoinHistoryItemProps): React.ReactElement => {
  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        width={24}
        height={24}
        className="w-[24px] h-[24px] cursor-pointer transition-transform hover:brightness-110"
        src={getCoinImage(coin)}
        alt={getCoinName(coin)}
        aria-label={getCoinName(coin)}
      />
    </motion.div>
  );
};

export default CoinHistoryItem;
