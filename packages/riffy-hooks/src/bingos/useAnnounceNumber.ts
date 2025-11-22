import { useSubscription } from '@apollo/client';
import { ANNOUNCE_NUMBER_SUBSCRIPTION } from '@riffy/graphql';

export const useAnnounceNumber = (bingoId?: string) => {
  const { data, error, loading } = useSubscription(
    ANNOUNCE_NUMBER_SUBSCRIPTION,
    {
      variables: { bingoId },
      skip: !bingoId,
    },
  );

  return {
    number: data?.announceNumber ?? null,
    error,
    loading,
  };
};

