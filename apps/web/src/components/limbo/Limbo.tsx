'use client';
import { Button, SelectAmount, NumberInput } from '@riffy/components';

import GameWrapper from '@/components/common/game-wrapper';
import TopGames from '@/components/common/top-games';
import ModalGameWin from '@/components/common/modals/game-win';
import MultiplierHistory from '@/components/common/multiplier-history';
import LimboValue from '@/components/limbo/limbo-value';

import { useGames, useLimbo } from '@/hooks';
import { MAX_MULTIPLIER, MAX_WIN_CHANCE } from '@/constants';

const Limbo = (): React.ReactElement => {
  const { data: games } = useGames();
  const {
    targetMultiplier,
    winChancePercentage,
    betAmount,
    setBetAmount,
    gameStarted,
    animatedMultiplier,
    result,
    profitAmount,
    multiplierHistory,
    balance,
    buttonBetDisabled,
    handleBet,
    setTargetMultiplierAndChance,
    setWinChanceAndMultiplier,
    isWinModalVisible,
  } = useLimbo();

  return (
    <section className="limbo w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center">
            <div className="flex w-full justify-center items-center h-full relative min-h-[200px]">
              <LimboValue value={animatedMultiplier} result={result} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={betAmount}
              setAmount={setBetAmount}
              maxValue={balance}
              disabled={gameStarted}
            />

            <NumberInput
              value={targetMultiplier}
              onChange={setTargetMultiplierAndChance}
              maxValue={MAX_MULTIPLIER}
              variant="modal"
              actionsType="plus-minus"
            />

            <NumberInput
              value={winChancePercentage}
              onChange={setWinChanceAndMultiplier}
              maxValue={MAX_WIN_CHANCE}
              variant="modal"
              actionsType="none"
              disabled
            />

            <Button
              data-testid="submit-bet"
              isFull
              variant="primary"
              onClick={handleBet}
              disabled={buttonBetDisabled}
            >
              Apuesta
            </Button>
          </div>

          <ModalGameWin
            amount={profitAmount}
            multiplier={targetMultiplier}
            open={isWinModalVisible}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default Limbo;
