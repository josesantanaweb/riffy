'use client';
import React, { useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { useParams } from 'next/navigation';
import {
  useBingo,
  useBoardsByBingo,
  useIsIPhone,
  useNumberDraw,
  useStartAutoNumberDraw,
  useStopAutoNumberDraw,
} from '@riffy/hooks';
import PageHeader from '../common/page-header';
import Card from './card';
import Balls from './balls';
import { getBingoLetter } from '@/utils/bingo';

const BingoPage = (): ReactElement => {
  const params = useParams<{ bingoId?: string }>();
  const bingoId = (params?.bingoId as string) || 'cmi6vrog30001tlhfzixoivku';
  const { data: bingo } = useBingo(bingoId);
  const { number: numberDraw } = useNumberDraw(bingoId);
  const { startAutoNumberDraw, loading: startingDraw } =
    useStartAutoNumberDraw();
  const { stopAutoNumberDraw, loading: stoppingDraw } = useStopAutoNumberDraw();
  const { data: boards } = useBoardsByBingo(bingoId);
  const isIPhone = useIsIPhone();
  const [isAutoDrawing, setIsAutoDrawing] = useState(false);
  const [lastBallId, setLastBallId] = useState<number | null>(null);
  const [balls, setBalls] = useState<
    { number: number; id: number; letter: string }[]
  >([]);

  const currentTitle = useMemo(() => bingo?.title ?? 'Bingo', [bingo?.title]);

  useEffect(() => {
    if (!bingo?.drawnNumbers) return;

    const mappedBalls = bingo.drawnNumbers.map((number, index) => ({
      number,
      id: index + 1,
      letter: getBingoLetter(number),
    }));

    setBalls(mappedBalls);
    setLastBallId(mappedBalls[mappedBalls.length - 1]?.id ?? null);
  }, [bingo?.drawnNumbers]);

  useEffect(() => {
    if (numberDraw === null) return;

    const newBall = {
      number: numberDraw,
      id: Date.now(),
      letter: getBingoLetter(numberDraw),
    };

    setBalls(prev => {
      const exists = prev.some(ball => ball.number === numberDraw);
      if (exists) {
        return prev;
      }
      return [...prev, newBall];
    });
    setLastBallId(newBall.id);
  }, [numberDraw]);

  const handleStartAutoDraw = async () => {
    if (!bingoId) return;
    await startAutoNumberDraw(bingoId);
    setIsAutoDrawing(true);
  };

  const handleStopAutoDraw = async () => {
    if (!bingoId) return;
    await stopAutoNumberDraw(bingoId);
    setIsAutoDrawing(false);
  };

  const handleBingo = () => {
    alert('¡BINGO! 🎉 ¡Has ganado!');
  };

  return (
    <div
      className={`w-full h-full flex flex-col px-5 py-5 gap-3 bg-box-primary ${isIPhone ? 'pb-16' : ''}`}
    >
      <PageHeader title={currentTitle} />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-3">
          <h5 className="text-title text-sm font-medium">Números</h5>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isAutoDrawing ? handleStopAutoDraw : handleStartAutoDraw}
            disabled={startingDraw || stoppingDraw}
            className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm disabled:opacity-50"
          >
            {isAutoDrawing ? 'Detener sorteo' : 'Iniciar sorteo'}
          </button>
        </div>
      </div>
      <Balls balls={balls} lastBallId={lastBallId} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center items-center">
        {boards?.map(board => (
          <Card
            key={board.id}
            id={board.id}
            numbers={board.numbers}
            markedNumbers={board.markedNumbers}
            handleBingo={handleBingo}
            availableNumbers={balls.map(ball => ball.number)}
          />
        ))}
      </div>
    </div>
  );
};

export default BingoPage;
