import { useEffect, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

import { useAdjustBalance } from '@/hooks';
import {
  ANIMATION_DURATION,
  DEFAULT_DISPLAY_VALUE,
  DEFAULT_MULTIPLIER,
  DEFAULT_WIN_CHANCE,
  HOUSE_EDGE,
  MAX_MULTIPLIER,
  MAX_WIN_CHANCE,
  WIN_MODAL_TIMEOUT,
} from '@/constants';
import type { IMultiplierHistory } from '@/components/common/multiplier-history';
import { ResultEnum } from '@/types';

export const useLimbo = () => {
  const [targetMultiplier, setTargetMultiplier] =
    useState<number>(DEFAULT_MULTIPLIER);
  const [winChancePercentage, setWinChancePercentage] =
    useState<number>(DEFAULT_WIN_CHANCE);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [resultMultiplier, setResultMultiplier] = useState<number | null>(null);
  const [animatedMultiplier, setAnimatedMultiplier] = useState<string>(
    DEFAULT_DISPLAY_VALUE.toFixed(2),
  );
  const [result, setResult] = useState<ResultEnum | null>(null);
  const [profitAmount, setProfitAmount] = useState<number>(0);
  const [multiplierHistory, setMultiplierHistory] = useState<
    IMultiplierHistory[]
  >([]);
  const [isWinModalVisible, setIsWinModalVisible] = useState<boolean>(false);

  const animatedValue = useMotionValue(targetMultiplier);
  const { adjustBalance, balance } = useAdjustBalance();

  useEffect(() => {
    if (resultMultiplier !== null) {
      const controls = animate(animatedValue, resultMultiplier, {
        duration: 0.5,
        ease: 'easeOut',
        onUpdate: v => setAnimatedMultiplier(v.toFixed(2)),
      });
      return () => controls.stop();
    }
    if (gameStarted) {
      setAnimatedMultiplier(targetMultiplier.toFixed(2));
    }
  }, [resultMultiplier, gameStarted]);

  useEffect(() => {
    if (result === ResultEnum.WIN || result === ResultEnum.LOSE) {
      const timeoutId = setTimeout(() => {
        setAnimatedMultiplier(DEFAULT_DISPLAY_VALUE.toFixed(2));
        setResult(null);
        setResultMultiplier(null);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [result]);

  const calculateMultiplier = (chance: number) => {
    return chance > 0 ? parseFloat((100 / chance).toFixed(2)) : MAX_MULTIPLIER;
  };

  const calculateWinChance = (mult: number) => {
    return mult > 0
      ? parseFloat((((1 - HOUSE_EDGE) * 100) / mult).toFixed(2))
      : MAX_WIN_CHANCE;
  };

  const startRound = () => {
    if (!betAmount || balance < betAmount) return;

    setGameStarted(true);
    setResult(null);
    setResultMultiplier(null);
    setProfitAmount(betAmount);
    adjustBalance(-betAmount);
  };

  const getPayoutMultiplier = () => {
    const random = Math.random();
    const payout = (1 - HOUSE_EDGE) / (1 - random);
    return Math.min(payout, MAX_MULTIPLIER);
  };

  const executeBet = () => {
    const payout = getPayoutMultiplier();
    const nextMultiplier = parseFloat(payout.toFixed(2));
    const isWin = nextMultiplier >= targetMultiplier;
    setResultMultiplier(nextMultiplier);

    setTimeout(() => {
      if (isWin) {
        const totalPayout = parseFloat(
          (betAmount * targetMultiplier).toFixed(2),
        );
        setResult(ResultEnum.WIN);
        setProfitAmount(totalPayout - betAmount);
        setIsWinModalVisible(true);
        setMultiplierHistory(prev => [
          ...prev,
          { value: nextMultiplier, result: ResultEnum.WIN },
        ]);
        adjustBalance(totalPayout);
        setTimeout(() => setIsWinModalVisible(false), WIN_MODAL_TIMEOUT);
      } else {
        setResult(ResultEnum.LOSE);
        setProfitAmount(0);
        setMultiplierHistory(prev => [
          ...prev,
          { value: nextMultiplier, result: ResultEnum.LOSE },
        ]);
      }
      setGameStarted(false);
    }, ANIMATION_DURATION);
  };

  const handleBet = () => {
    if (!gameStarted) startRound();
    executeBet();
  };

  const setTargetMultiplierAndChance = (value: number) => {
    setTargetMultiplier(value);
    setWinChancePercentage(calculateWinChance(value));
  };

  const setWinChanceAndMultiplier = (value: number) => {
    setWinChancePercentage(value);
    setTargetMultiplier(calculateMultiplier(value));
  };

  const isBalanceInsufficient = balance <= 0 || betAmount > balance;
  const buttonBetDisabled = gameStarted || !betAmount || isBalanceInsufficient;

  return {
    targetMultiplier,
    winChancePercentage,
    betAmount,
    setBetAmount,
    gameStarted,
    resultMultiplier,
    animatedMultiplier,
    result,
    profitAmount,
    multiplierHistory,
    balance,

    isBalanceInsufficient,
    buttonBetDisabled,

    handleBet,
    setTargetMultiplierAndChance,
    setWinChanceAndMultiplier,

    isWinModalVisible,
  };
};
