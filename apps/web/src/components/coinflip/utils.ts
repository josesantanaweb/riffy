import { CoinEnum } from '@/types/common';
import { ResultEnum } from '../../types/common';
import { ASSETS } from '@/constants';

export const coinAssets = {
  [CoinEnum.HEADS]: {
    image: ASSETS.IMAGES.COINFLIP.HEADS,
    name: 'Cara',
  },
  [CoinEnum.TAILS]: {
    image: ASSETS.IMAGES.COINFLIP.TAILS,
    name: 'Sello',
  },
};

export const getCoinImage = (coin: CoinEnum) => coinAssets[coin].image;
export const getCoinName = (coin: CoinEnum) => coinAssets[coin].name;

export const getCoinOutcome = (): CoinEnum =>
  Math.random() < 0.5 ? CoinEnum.HEADS : CoinEnum.TAILS;

export const getMultiplier = (
  base: number,
  bonus: number,
  winStreak: number,
): number => base + winStreak * bonus;

export const getMultiplierColor = (result: ResultEnum): string => {
  switch (result) {
    case ResultEnum.WIN:
      return 'text-green-500';
    case ResultEnum.LOSE:
      return 'text-red-500';
    default:
      return 'text-base-300';
  }
};
