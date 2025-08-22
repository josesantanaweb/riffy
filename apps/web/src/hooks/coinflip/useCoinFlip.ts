import { useState } from 'react';
import { useAdjustBalance } from '@/hooks';

import { CoinEnum, ResultEnum } from '@/types/common';

import { getCoinOutcome, getMultiplier } from '@/components/coinflip/utils';
import { playSound } from '@/utils/play-sound';

import type { IMultiplierHistory } from '@/components/common/multiplier-history';

import { ASSETS, BASE_MULTIPLIER, BONUS_PER_WIN } from '@/constants';

export const useCoinFlip = () => {
  const [flipping, setFlipping] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [choice, setChoice] = useState<CoinEnum | null>(null);
  const [result, setResult] = useState<ResultEnum | null>(null);
  const [coinResult, setCoinResult] = useState<CoinEnum>(CoinEnum.HEADS);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [coinHistory, setCoinHistory] = useState<CoinEnum[]>([]);
  const [multiplierHistory, setMultiplierHistory] = useState<IMultiplierHistory[]>([]);
  const [winStreak, setWinStreak] = useState<number>(0);

  const multiplier = getMultiplier(BASE_MULTIPLIER, BONUS_PER_WIN, winStreak);
  const { adjustBalance, balance } = useAdjustBalance();

  const startRound = () => {
    if (!betAmount) return;

    adjustBalance(-betAmount);

    setGameStarted(true);
    playSound(ASSETS.SOUNDS.COINFLIP.START);
    setResult(null);
    setChoice(null);
    setCoinHistory([]);
    setCoinResult(CoinEnum.HEADS);
    setTotalWinnings(betAmount);
    setWinAmount(betAmount);
  };

  const handleFlip = (choice: CoinEnum) => {
    if (!betAmount || flipping) return;

    setChoice(choice);
    setFlipping(true);
    playSound(ASSETS.SOUNDS.COINFLIP.FLIP);
    setResult(null);

    setTimeout(() => {
      const outcome = getCoinOutcome();
      const didWin = outcome === choice;
      const currentMultiplier = getMultiplier(
        BASE_MULTIPLIER,
        BONUS_PER_WIN,
        winStreak,
      );

      setCoinResult(outcome);
      setCoinHistory(prev => [...prev, outcome]);
      setFlipping(false);
      setResult(didWin ? ResultEnum.WIN : ResultEnum.LOSE);

      if (didWin) {
        setWinStreak(prev => prev + 1);
        setTotalWinnings(prev => prev * currentMultiplier);
        setWinAmount(prev => prev * currentMultiplier);
        setChoice(null);
      } else {
        setTimeout(() => {
          setMultiplierHistory(prev => [
            ...prev,
            { value: currentMultiplier, result: ResultEnum.LOSE },
          ]);
          setTotalWinnings(0);
          setWinAmount(0);
          resetGame();
          setResult(null);
        }, 2200);
      }
    }, 1200);
  };

  const handleRetire = () => {
    playSound(ASSETS.SOUNDS.COINFLIP.WIN);
    setMultiplierHistory(prev => [
      ...prev,
      { value: multiplier, result: ResultEnum.WIN },
    ]);
    setWinStreak(0);
    adjustBalance(totalWinnings);
    resetGame();
    setResult(null);
  };

  const resetGame = () => {
    setGameStarted(false);
    setBetAmount(null);
    setChoice(null);
    setTotalWinnings(0);
    setCoinHistory([]);
    setCoinResult(CoinEnum.HEADS);
    setWinStreak(0);
  };

  return {
    flipping,
    betAmount,
    setBetAmount,
    gameStarted,
    choice,
    coinResult,
    result,
    coinHistory,
    multiplier,
    totalWinnings,
    multiplierHistory,
    winStreak,
    winAmount,

    handleFlip,
    startRound,
    handleRetire,
    resetGame,
    setChoice,

    balance,
  };
};
