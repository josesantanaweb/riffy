import { useMutation } from '@apollo/client';
import { UPDATE_RAFFLE } from '@riffy/graphql';
import { CreateRaffleInput } from '@riffy/types';

export const useUpdateRaffle = () => {
  const [updateRaffleMutation, { data, error, loading }] = useMutation(
    UPDATE_RAFFLE,
    {
      refetchQueries: ['Raffles'],
      awaitRefetchQueries: true,
    },
  );

  const updateRaffle = (id: string, input: CreateRaffleInput) => {
    return updateRaffleMutation({
      variables: {
        id,
        input,
      },
    });
  };

  return {
    updateRaffle,
    data: data?.updateRaffle || null,
    error,
    loading,
  };
};
