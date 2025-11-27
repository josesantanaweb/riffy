'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface Ball {
  number: number;
  letter: string;
  id: number;
}

interface BallProps {
  ball: Ball;
  isLast?: boolean;
}

const Ball = ({ ball, isLast }: BallProps): ReactElement => {
  const { number, letter, id } = ball;

  return (
    <div key={id} className={`flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full p-2 ${isLast ? 'animate-ball-animate' : ''}`}>
      <div className="bg-white rounded-full flex flex-col items-center justify-cente w-full h-full">
        <span className="text-black text-xs font-black leading-none uppercase">{letter}</span>
        <span className="font-black text-base text-black leading-none">{number}</span>
      </div>
    </div>
  );
};

export default Ball;
