import { useMutation } from '@apollo/client';
import { STOP_BINGO_AUTO_DRAW } from '@riffy/graphql';

export const useStopBingoAutoDraw = () => {
  const [stopMutation, { data, error, loading }] = useMutation(
    STOP_BINGO_AUTO_DRAW,
  );

  const stopAutoDraw = (bingoId: string) => {
    return stopMutation({
      variables: { bingoId },
    });
  };

  return {
    stopAutoDraw,
    data: data?.stopBingoAutoDraw ?? null,
    error,
    loading,
  };
};

