'use client';
import React, { useState, useEffect } from 'react';
import {
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { Button } from '@riffy/components';
import { SelectAmount } from '@riffy/components';

import CoinFlipping from '@/components/coinflip/coin-flipping';
import CoinHistory from '@/components/coinflip/coin-history';
import MultiplierLabel from '@/components/coinflip/multiplier-label';
import CoinOptions from '@/components/coinflip/coin-options';

import MultiplierHistory from '@/components/common/multiplier-history';
import GameWrapper from '@/components/common/game-wrapper';
import ModalGameWin from '@/components/common/modals/game-win';
import TopGames from '@/components/common/top-games';

import { useCoinFlip, useGames } from '@/hooks';
import { ResultEnum } from '@/types/common';
import { WIN_MODAL_TIMEOUT, ASSETS } from '@/constants';
import { playSound } from '@/utils/play-sound';

const CoinFlip = (): React.ReactElement => {
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  const { data: games } = useGames();
  const [animatedMultiplier, setAnimatedMultiplier] = useState<string>('0.00');
  const motionValue = useMotionValue(0);

  const animatedValue = useTransform(motionValue, value => value.toFixed(2));

  const {
    flipping,
    betAmount,
    setBetAmount,
    gameStarted,
    coinResult,
    result,
    coinHistory,
    multiplier,
    handleFlip,
    startRound,
    handleRetire,
    totalWinnings,
    winAmount,
    multiplierHistory,
    winStreak,
    balance,
    choice,
    setChoice,
  } = useCoinFlip();

  const handleBet = () => {
    if (totalWinnings > 0) {
      setShowWinModal(true);
      handleRetire();
      setTimeout(() => setShowWinModal(false), WIN_MODAL_TIMEOUT);
    } else if (choice !== null && betAmount) {
      startRound();
      handleFlip(choice);
    }
  };

  const handleChoice = (opt: typeof choice) => {
    setChoice(opt);
    if (result === ResultEnum.WIN) {
      handleFlip(opt);
    }
  };

  const canRetire = totalWinnings > 0;
  const isFlipping = flipping;
  const isAmountMissing = !betAmount;
  const isLost = result === ResultEnum.LOSE;
  const isBalanceInsufficient =
    balance <= 0 || (betAmount !== null && balance < betAmount);

  const buttonBetDisabled = canRetire
    ? isFlipping || winStreak <= 0 || isLost
    : isFlipping || isAmountMissing || choice === null || isBalanceInsufficient;

  const coinOptionsDisabled = isFlipping || isLost || isAmountMissing;

  const buttonBetLabel = canRetire
    ? `Retirar  ${totalWinnings.toFixed(2)} ves`
    : 'Apuesta';

  useEffect(() => {
    const unsubscribe = animatedValue.on('change', v =>
      setAnimatedMultiplier(v),
    );
    return () => unsubscribe();
  }, [animatedValue]);

  useEffect(() => {
    if (betAmount === null) return;

    let from = 0;
    let to = multiplier;

    if (result === ResultEnum.LOSE) {
      from = multiplier;
      to = 0;
    }

    motionValue.set(from);
    animate(motionValue, to, {
      duration: 0.6,
      ease: 'easeOut',
    });

    if (result === ResultEnum.WIN) {
      playSound(ASSETS.SOUNDS.COINFLIP.MULTIPLIER_WIN);
    }

    if (result === ResultEnum.LOSE) {
      playSound(ASSETS.SOUNDS.COINFLIP.MULTIPLIER_LOSE);
    }
  }, [multiplier, result, betAmount]);

  return (
    <section className="coin-flip w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center">
            <div className="flex w-full justify-center items-center h-full relative min-h-[230px]">
              <span className="flex-1" />
              <CoinFlipping flipping={flipping} coinResult={coinResult} />
              <MultiplierLabel
                result={result}
                multiplier={multiplier}
                value={animatedMultiplier}
              />
            </div>
            <CoinHistory history={coinHistory} />
          </div>
          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={betAmount}
              setAmount={setBetAmount}
              disabled={gameStarted}
              maxValue={balance}
            />

            <CoinOptions
              choice={choice}
              onClick={handleChoice}
              disabled={coinOptionsDisabled}
            />

            <Button
              data-testid="submit-bet"
              isFull
              variant="primary"
              onClick={handleBet}
              disabled={buttonBetDisabled}
            >
              {buttonBetLabel}
            </Button>
          </div>

          <ModalGameWin
            amount={winAmount}
            multiplier={multiplier}
            open={showWinModal}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default CoinFlip;
