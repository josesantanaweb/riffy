'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface BallProps {
  letter: string;
  number: string;
}

const Ball = ({ letter, number }: BallProps): ReactElement => {

  return (
    <div className="flex items-center justify-center w-12 h-12 bg-violet-600 rounded-full p-2">
      <div className="bg-white rounded-full flex flex-col items-center justify-cente w-full h-full">
        <span className="text-black text-xs font-black leading-none uppercase">{letter}</span>
        <span className="font-black text-base text-black leading-none">{number}</span>
      </div>
    </div>
  );
};

export default Ball;
