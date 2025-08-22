'use client';
import { Button, SelectAmount } from '@riffy/components';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

import GameWrapper from '@/components/common/game-wrapper';
import TopGames from '@/components/common/top-games';
import { ResultEnum } from '@/types/common';
import MultiplierHistory, {
  IMultiplierHistory,
} from '@/components/common/multiplier-history';
import ModalGameWin from '@/components/common/modals/game-win';
import { useAdjustBalance, useGames } from '@/hooks';
import {
  ASSETS,
  SLIDE_WIDTH,
  TOTAL_SLIDE_WIDTH,
  REPEAT_COUNT,
  SPIN_DURATION,
  ROTATIONS,
  WIN_MODAL_TIMEOUT,
} from '@/constants';
import SlideItem from './slide-item';
import SlideOptions from './slide-options/SlideOptions';
import Image from 'next/image';
import { SlideEnum } from '@/types/common';

interface ISlide {
  id: number;
  multiplier: number;
  color: string;
  type: SlideEnum;
}

const Slides = (): React.ReactElement => {
  const { data: games } = useGames();

  const [isWinModalVisible, setIsWinModalVisible] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinOffset, setSpinOffset] = useState(0);
  const [spinDuration, setSpinDuration] = useState(0);
  const [profitAmount, setProfitAmount] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [multiplierHistory, setMultiplierHistory] = useState<
    IMultiplierHistory[]
  >([]);
  const [choice, setChoice] = useState<{
    multiplier: number;
    type: SlideEnum;
  } | null>(null);

  const { adjustBalance, balance } = useAdjustBalance();

  const isBalanceInsufficient = balance <= 0 || betAmount > balance;
  const buttonBetDisabled =
    gameStarted || !betAmount || isBalanceInsufficient || !choice;
  const slideOptionsDisabled = !betAmount || gameStarted;
  const containerRef = useRef<HTMLDivElement>(null);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SLIDES: ISlide[] = [
    { id: 1, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 2, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
    { id: 3, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 4, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
    { id: 5, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 6, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
    { id: 7, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 8, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
    { id: 9, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 10, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
    { id: 11, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 12, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
    { id: 13, multiplier: 2, color: 'bg-red-500', type: SlideEnum.BLACK },
    { id: 14, multiplier: 14, color: 'bg-primary-600', type: SlideEnum.VIOLET },
    { id: 15, multiplier: 2, color: 'bg-base-700', type: SlideEnum.RED },
  ];

  const INFINITE_SLIDES = Array(REPEAT_COUNT)
    .fill(null)
    .flatMap(() => SLIDES);

  const loopWidth = TOTAL_SLIDE_WIDTH * SLIDES.length;

  useEffect(() => {
    const maxOffset = loopWidth * (REPEAT_COUNT / 2);
    if (spinOffset >= maxOffset) {
      setSpinOffset(prev => prev % loopWidth);
    }
  }, [spinOffset, loopWidth]);

  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    };
  }, []);

  const resetRoulette = () => {
    setSpinDuration(0);
    setSpinOffset(prev => prev % loopWidth);
  };

  const resetGame = () => {
    setGameStarted(false);
    setBetAmount(null);
    setChoice(null);
    setProfitAmount(0);
    setIsWinModalVisible(false);
  };

  const startSpin = () => {
    if (isSpinning || !betAmount || !choice) return;

    adjustBalance(-betAmount);
    setGameStarted(true);

    resetRoulette();
    setProfitAmount(betAmount);

    const isWin = Math.random() < 0.5;

    const candidateSlides = isWin
      ? SLIDES.filter(
          s =>
            s.multiplier === choice.multiplier &&
            s.type === choice.type,
        )
      : SLIDES.filter(
          s =>
            s.multiplier !== choice.multiplier ||
            s.type !== choice.type,
        );

    const winnerIndex = Math.floor(Math.random() * candidateSlides.length);
    const winnerSlide = candidateSlides[winnerIndex];
    const slideIndex = SLIDES.findIndex(s => s.id === winnerSlide.id);

    const baseOffset = slideIndex * TOTAL_SLIDE_WIDTH;
    const centerAdjustment = SLIDE_WIDTH / 2 + 57;
    const centerOffset = baseOffset + centerAdjustment;

    const spinDistance = ROTATIONS * loopWidth + centerOffset;

    setSpinDuration(SPIN_DURATION);

    requestAnimationFrame(() => {
      setIsSpinning(true);
      setSpinOffset(spinDistance);
    });

    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    spinTimerRef.current = setTimeout(() => {
      setIsSpinning(false);

      setMultiplierHistory(prev => [
        ...prev,
        {
          value: choice.multiplier,
          result: isWin ? ResultEnum.WIN : ResultEnum.LOSE,
        },
      ]);

      if (isWin) {
        const totalPayout = parseFloat(
          (betAmount * choice.multiplier).toFixed(2),
        );

        const netProfit = parseFloat((totalPayout - betAmount).toFixed(2));
        setProfitAmount(netProfit);
        adjustBalance(totalPayout);
        setIsWinModalVisible(true);

        setTimeout(() => {
          setIsWinModalVisible(false);
        }, WIN_MODAL_TIMEOUT);
      } else {
        setProfitAmount(0);
      }

      setTimeout(() => {
        resetGame();
      }, 2000);
    }, SPIN_DURATION * 1000);
  };

  const handleChoice = (type: SlideEnum, multiplier: number) => setChoice({ multiplier, type });

  return (
    <section className="limbo w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center relative overflow-hidden">
            <div
              ref={containerRef}
              className="flex justify-center items-center h-full relative min-h-[230px] w-[478px] mx-auto"
            >
              <motion.div
                className="flex gap-3"
                animate={{ x: -spinOffset }}
                transition={{
                  duration: isSpinning ? spinDuration : 0,
                  ease: [0.68, 0.01, 0.32, 1],
                  type: 'tween',
                }}
              >
                {INFINITE_SLIDES.map((slide, index) => (
                  <SlideItem key={`${slide.id}-${index}`} slide={slide} />
                ))}
              </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
              <Image
                src={ASSETS.IMAGES.SLIDES.INDICATOR}
                alt="indicator"
                width={32}
                height={39}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={betAmount}
              setAmount={setBetAmount}
              maxValue={balance}
              disabled={gameStarted}
            />

            <SlideOptions
              type={choice?.type}
              onClick={handleChoice}
              disabled={slideOptionsDisabled}
            />

            <div className="flex gap-3">
              <Button
                data-testid="submit-bet"
                isFull
                variant="primary"
                onClick={startSpin}
                disabled={buttonBetDisabled}
              >
                Apuesta
              </Button>
            </div>
          </div>
          <ModalGameWin
            amount={profitAmount}
            multiplier={choice?.multiplier || 0}
            open={isWinModalVisible}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default Slides;
