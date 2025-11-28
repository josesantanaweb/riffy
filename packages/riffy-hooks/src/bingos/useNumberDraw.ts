import { useSubscription } from '@apollo/client';
import { NUMBER_DRAW_SUBSCRIPTION } from '@riffy/graphql';

export const useNumberDraw = (bingoId?: string) => {
  const { data, error, loading } = useSubscription(
    NUMBER_DRAW_SUBSCRIPTION,
    {
      variables: { bingoId },
      skip: !bingoId,
    },
  );

  return {
    number: data?.numberDraw ?? null,
    error,
    loading,
  };
};

