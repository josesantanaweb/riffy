import { useMutation } from '@apollo/client';
import { START_AUTO_NUMBER_DRAW } from '@riffy/graphql';

export const useStartAutoNumberDraw = () => {
  const [startMutation, { data, error, loading }] = useMutation(
    START_AUTO_NUMBER_DRAW,
  );

  const startAutoNumberDraw = (bingoId: string) => {
    return startMutation({
      variables: { bingoId },
    });
  };

  return {
    startAutoNumberDraw,
    data: data?.startAutoNumberDraw ?? null,
    error,
    loading,
  };
};

