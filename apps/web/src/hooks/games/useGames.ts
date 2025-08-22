import { games } from '@/data/games.json';

export const useGames = () => {
  return {
    data: games || [],
    error: null,
    loading: false,
  };
};
