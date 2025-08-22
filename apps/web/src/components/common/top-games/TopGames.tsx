'use client';
import React from 'react';
import GameCard from '@/components/coinflip/game-card';
import type { IGame } from '@/types/game';

interface TopGamesProps {
  games: IGame[];
}

const TopGames = ({ games }: TopGamesProps): React.ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <h6 className="text-white text-base font-bold">Juegos Recomendados</h6>
      <div className="flex items-center gap-3 max-w-full overflow-x-auto scrollbar-transparent">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default TopGames;
