'use client';
import React from 'react';
import Image from 'next/image';
import { Logo } from '@riffy/components';
import type { IGame } from '@/types/game';

interface GameCardProps {
  game: IGame;
}

const GameCard = ({ game }: GameCardProps): React.ReactElement => {
  const { name, logo, colors } = game;
  const gradient = colors
    ? { background: `linear-gradient(to bottom, ${colors.from}, ${colors.to})` }
    : {};

  return (
    <div
      style={gradient}
      className="rounded-xl h-[190px] py-4 flex-shrink-0 w-[140px] flex items-center justify-center flex-col gap-6"
    >
      <div className="flex flex-col gap-3 justify-center items-center flex-1">
        <div className="relative w-[120px] h-[72px]">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain object-center"
          />
        </div>
        <h3 className="text-white text-xl font-black uppercase max-w-[100px] text-center leading-none">
          {name}
        </h3>
      </div>
      <Logo variant="white" width={60} />
    </div>
  );
};

export default GameCard;
