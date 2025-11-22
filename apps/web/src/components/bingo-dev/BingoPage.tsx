'use client';
import React, { useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import {
  useAnnounceNumber,
  useBingo,
  useIsIPhone,
  useStartBingoAutoDraw,
  useStopBingoAutoDraw,
} from '@riffy/hooks';
import PageHeader from '../common/page-header';
import Card from './card';
import Balls from './balls';
import { getLetter } from '../utils';
import { useParams } from 'next/navigation';

const BingoPage = (): ReactElement => {
  const params = useParams<{ bingoId?: string }>();
  const bingoId =
    (params?.bingoId as string) || 'cmi6vrog30001tlhfzixoivku';
  const { data: bingo } = useBingo(bingoId);
  const { number: announcedNumber } = useAnnounceNumber(bingoId);
  const { startAutoDraw, loading: startingDraw } = useStartBingoAutoDraw();
  const { stopAutoDraw, loading: stoppingDraw } = useStopBingoAutoDraw();
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
      letter: getLetter(number),
    }));

    setBalls(mappedBalls);
    setLastBallId(mappedBalls[mappedBalls.length - 1]?.id ?? null);
  }, [bingo?.drawnNumbers]);

  useEffect(() => {
    if (announcedNumber === null) return;

    const newBall = {
      number: announcedNumber,
      id: Date.now(),
      letter: getLetter(announcedNumber),
    };

    setBalls((prev) => {
      const exists = prev.some((ball) => ball.number === announcedNumber);
      if (exists) {
        return prev;
      }
      return [...prev, newBall];
    });
    setLastBallId(newBall.id);
  }, [announcedNumber]);

  const handleStartAutoDraw = async () => {
    if (!bingoId) return;
    await startAutoDraw(bingoId);
    setIsAutoDrawing(true);
  };

  const handleStopAutoDraw = async () => {
    if (!bingoId) return;
    await stopAutoDraw(bingoId);
    setIsAutoDrawing(false);
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
      <div className="flex items-center w-full gap-2">
        <Balls balls={balls} lastBallId={lastBallId} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card
          numbers={[
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, -1, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
          ]}
          handleBingo={() => {}}
        />
        <Card
          numbers={[
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, -1, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
          ]}
          handleBingo={() => {}}
        />
      </div>
    </div>
  );
};

export default BingoPage;
