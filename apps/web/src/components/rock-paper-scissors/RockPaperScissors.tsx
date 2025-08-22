'use client';
import { Button, SelectAmount } from '@riffy/components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import GameWrapper from '@/components/common/game-wrapper';
import TopGames from '@/components/common/top-games';
import { ResultEnum } from '@/types/common';
import MultiplierHistory, {
  IMultiplierHistory,
} from '@/components/common/multiplier-history';
import ModalGameWin from '@/components/common/modals/game-win';
import { useAdjustBalance, useGames } from '@/hooks';
import { ASSETS } from '@/constants';
import RockPaperScissorsOptions from './rock-paper-scissors-options';
import Image from 'next/image';
import { RockPaperScissorsEnum } from '@/types/common';

const getUserChoiceImage = (choice: RockPaperScissorsEnum | null): string => {
  if (!choice) return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_LEFT || '';

  switch (choice) {
    case RockPaperScissorsEnum.ROCK:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_LEFT || '';
    case RockPaperScissorsEnum.PAPER:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.PAPER_LEFT || '';
    case RockPaperScissorsEnum.SCISSORS:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.SCISSORS_LEFT || '';
    default:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_LEFT || '';
  }
};

const getMachineChoiceImage = (
  choice: RockPaperScissorsEnum | null,
): string => {
  if (!choice) return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT || '';

  switch (choice) {
    case RockPaperScissorsEnum.ROCK:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT || '';
    case RockPaperScissorsEnum.PAPER:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.PAPER_RIGHT || '';
    case RockPaperScissorsEnum.SCISSORS:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.SCISSORS_RIGHT || '';
    default:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT || '';
  }
};
const getRandomChoice = (): RockPaperScissorsEnum => {
  const choices = [
    RockPaperScissorsEnum.ROCK,
    RockPaperScissorsEnum.PAPER,
    RockPaperScissorsEnum.SCISSORS,
  ];
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (
  playerChoice: RockPaperScissorsEnum,
  machineChoice: RockPaperScissorsEnum,
): ResultEnum => {
  if (playerChoice === machineChoice) return ResultEnum.DRAW;

  const winConditions = {
    [RockPaperScissorsEnum.ROCK]: RockPaperScissorsEnum.SCISSORS,
    [RockPaperScissorsEnum.PAPER]: RockPaperScissorsEnum.ROCK,
    [RockPaperScissorsEnum.SCISSORS]: RockPaperScissorsEnum.PAPER,
  };

  return winConditions[playerChoice] === machineChoice
    ? ResultEnum.WIN
    : ResultEnum.LOSE;
};

const Slides = (): React.ReactElement => {
  const [animateChoices, setAnimateChoices] = useState(false);
  const { data: games } = useGames();

  const [isWinModalVisible, setIsWinModalVisible] = useState<boolean>(false);
  const [profitAmount, setProfitAmount] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [multiplierHistory, setMultiplierHistory] = useState<
    IMultiplierHistory[]
  >([]);
  const [choice, setChoice] = useState<RockPaperScissorsEnum | null>(null);
  const [machineChoice, setMachineChoice] =
    useState<RockPaperScissorsEnum | null>(null);
  const [gameResult, setGameResult] = useState<ResultEnum | null>(null);
  const [showMachineChoice, setShowMachineChoice] = useState<boolean>(false);

  const { adjustBalance, balance } = useAdjustBalance();

  const buttonBetDisabled =
    gameStarted || !betAmount || !choice || !!gameResult || !!machineChoice;
  const slideOptionsDisabled =
    !betAmount || gameStarted || !!gameResult || !!machineChoice;

  const handleChoice = (type: RockPaperScissorsEnum) => setChoice(type);

  const handleGameAction = async () => {
    if (!choice || !betAmount) return;
    setAnimateChoices(true);
    setTimeout(() => {
      startGame();
    }, 400);
  };

  const startGame = async () => {
    if (!choice || !betAmount) return;

    setGameStarted(true);
    setGameResult(null);
    setShowMachineChoice(false);

    const machineChoice = getRandomChoice();
    setMachineChoice(machineChoice);

    setTimeout(() => {
      setShowMachineChoice(true);
      const result = determineWinner(choice, machineChoice);
      setGameResult(result);

      let profit = 0;
      if (result === ResultEnum.WIN) {
        profit = betAmount * 2;
        adjustBalance(profit);
        setProfitAmount(profit);
        setTimeout(() => {
          setIsWinModalVisible(true);
        }, 500);
      } else if (result === ResultEnum.LOSE) {
        adjustBalance(-betAmount);
      } else {
        adjustBalance(0);
      }

      const newHistory: IMultiplierHistory = {
        value: result === ResultEnum.WIN ? 2 : 0,
        result: result === ResultEnum.DRAW ? ResultEnum.LOSE : result,
      };
      setMultiplierHistory(prev => [newHistory, ...prev.slice(0, 9)]);

      setGameStarted(false);

      setTimeout(() => {
        resetGame();
      }, 2000);
    }, 1000);
  };

  const resetGame = () => {
    setChoice(null);
    setMachineChoice(null);
    setGameResult(null);
    setGameStarted(false);
    setShowMachineChoice(false);
    setAnimateChoices(false);
  };

  useEffect(() => {
    if (isWinModalVisible) {
      const timer = setTimeout(() => {
        setIsWinModalVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isWinModalVisible]);

  return (
    <section className="limbo w-full relative p-4 mb-[120px] overflow-hidden">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center">
            <div className="flex w-full items-center h-full relative min-h-[200px] justify-between overflow-hidden">
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ x: -120 }}
                animate={animateChoices ? { x: 0 } : { x: -120 }}
                transition={{
                  x: { duration: 0.7, ease: [0.42, 0, 0.58, 1] },
                  delay: animateChoices ? 0 : 0,
                }}
              >
                <div className="h-32 flex items-center">
                  <Image
                    src={getUserChoiceImage(choice)}
                    alt={choice}
                    className="w-32 h-auto"
                    width={128}
                    height={128}
                  />
                </div>
              </motion.div>

              <p className="uppercase text-white text-3xl font-bold">vs</p>

              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ x: 120 }}
                animate={animateChoices ? { x: 0 } : { x: 120 }}
                transition={{
                  x: { duration: 0.7, ease: [0.42, 0, 0.58, 1] },
                  delay: animateChoices ? 0 : 0,
                }}
              >
                <div className="h-32 flex items-center">
                  {showMachineChoice && machineChoice ? (
                    <Image
                      src={getMachineChoiceImage(machineChoice)}
                      alt={machineChoice}
                      className="w-32 h-auto"
                      width={128}
                      height={128}
                    />
                  ) : (
                    <Image
                      src={ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT}
                      alt={machineChoice}
                      className="w-32 h-auto opacity-50 grayscale"
                      width={128}
                      height={128}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={betAmount}
              setAmount={setBetAmount}
              maxValue={balance}
              disabled={gameStarted}
            />

            <RockPaperScissorsOptions
              type={choice}
              onClick={handleChoice}
              disabled={slideOptionsDisabled}
            />

            <div className="flex gap-3">
              <Button
                data-testid="submit-bet"
                isFull
                variant="primary"
                onClick={handleGameAction}
                disabled={buttonBetDisabled}
              >
                Apuesta
              </Button>
            </div>
          </div>
          <ModalGameWin
            amount={profitAmount}
            multiplier={gameResult === ResultEnum.WIN ? 2 : 0}
            open={isWinModalVisible}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default Slides;
