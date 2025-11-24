import { useMutation } from '@apollo/client';
import { STOP_AUTO_NUMBER_DRAW } from '@riffy/graphql';

export const useStopAutoNumberDraw = () => {
  const [stopMutation, { data, error, loading }] = useMutation(
    STOP_AUTO_NUMBER_DRAW,
  );

  const stopAutoNumberDraw = (bingoId: string) => {
    return stopMutation({
      variables: { bingoId },
    });
  };

  return {
    stopAutoNumberDraw,
    data: data?.stopAutoNumberDraw ?? null,
    error,
    loading,
  };
};

