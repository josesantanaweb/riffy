'use client';
import React, { useEffect, useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import { useIsIPhone } from '@riffy/hooks';
import PageHeader from '../common/page-header';
import Card from './card';
import Balls from './balls';
import { getLetter } from '../utils';

const BingoPage = (): ReactElement => {
  const isIPhone = useIsIPhone();
  const [lastBallId, setLastBallId] = useState<number | null>(null);
  const [balls, setBalls] = useState<
    { number: number; id: number; letter: string }[]
  >([]);

  const addBall = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 75) + 1;
    const newBall = {
      number: newNumber,
      id: Math.floor(Math.random() * 1000000),
      letter: getLetter(newNumber),
    };
    setBalls(prev => [...prev, newBall]);
    setLastBallId(newBall.id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      addBall();
    }, 4000);

    return () => clearInterval(interval);
  }, [addBall]);

  return (
    <div
      className={`w-full h-full flex flex-col px-5 py-5 gap-3 bg-box-primary ${isIPhone ? 'pb-16' : ''}`}
    >
      <PageHeader title="Bingo #12" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-3">
          <h5 className="text-title text-sm font-medium">Números</h5>
        </div>
        <div className="flex items-center gap-3">
          <h5 className="text-title text-sm font-medium">
            <span className="text-body-100 mr-1">Modo:</span> Vertical
          </h5>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className="w-1.5 h-1.5 bg-primary-500 rounded-full"
              />
            ))}
          </div>
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
