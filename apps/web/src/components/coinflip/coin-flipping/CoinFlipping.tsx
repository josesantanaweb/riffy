'use client';
import React from 'react';
import Image from 'next/image';
import { CoinEnum } from '@/types/common';
import { getCoinImage, getCoinName } from '@/components/coinflip/utils';

interface CoinFlippingProps {
  flipping: boolean;
  coinResult: CoinEnum;
}

const CoinFlipping = ({
  flipping,
  coinResult,
}: CoinFlippingProps): React.ReactElement => {
  return (
    <Image
      width={140}
      height={140}
      className={`w-[140px] h-[140px] ${flipping ? 'animate-coin-flip' : ''}`}
      src={getCoinImage(coinResult)}
      alt={getCoinName(coinResult)}
      aria-label={getCoinName(coinResult)}
    />
  );
};

export default CoinFlipping;
