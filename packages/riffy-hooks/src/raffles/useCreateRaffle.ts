import { useMutation } from '@apollo/client';
import { CREATE_RAFFLE } from '@riffy/graphql';
import { CreateRaffleInput } from '@riffy/types';

export const useCreateRaffle = () => {
  const [createRaffleMutation, { data, error, loading }] = useMutation(
    CREATE_RAFFLE,
    {
      refetchQueries: ['Raffles'],
      awaitRefetchQueries: true,
    },
  );

  const createRaffle = (input: CreateRaffleInput) => {
    return createRaffleMutation({
      variables: {
        input,
      },
    });
  };

  return {
    createRaffle,
    data: data?.createRaffle || null,
    error,
    loading,
  };
};
