import { useMutation } from '@apollo/client';
import { START_BINGO_AUTO_DRAW } from '@riffy/graphql';

export const useStartBingoAutoDraw = () => {
  const [startMutation, { data, error, loading }] = useMutation(
    START_BINGO_AUTO_DRAW,
  );

  const startAutoDraw = (bingoId: string) => {
    return startMutation({
      variables: { bingoId },
    });
  };

  return {
    startAutoDraw,
    data: data?.startBingoAutoDraw ?? null,
    error,
    loading,
  };
};

