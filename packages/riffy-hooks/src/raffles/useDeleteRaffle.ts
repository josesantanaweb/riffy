import { useMutation } from '@apollo/client';
import { DELETE_RAFFLE } from '@riffy/graphql';

export const useDeleteRaffle = () => {
  const [deleteRaffleMutation, { data, error, loading }] = useMutation(
    DELETE_RAFFLE,
    {
      refetchQueries: ['Raffles'],
      awaitRefetchQueries: true,
    },
  );

  const deleteRaffle = (id: string) => {
    return deleteRaffleMutation({
      variables: {
        id,
      },
    });
  };

  return {
    deleteRaffle,
    data: data?.deleteRaffle || null,
    error,
    loading,
  };
};
