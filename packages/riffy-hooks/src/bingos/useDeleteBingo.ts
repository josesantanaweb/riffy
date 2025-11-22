import { useMutation } from '@apollo/client';
import { DELETE_BINGO } from '@riffy/graphql';

export const useDeleteBingo = () => {
  const [deleteBingoMutation, { data, error, loading }] = useMutation(
    DELETE_BINGO,
    {
      refetchQueries: ['Bingos'],
      awaitRefetchQueries: true,
    },
  );

  const deleteBingo = (id: string) => {
    return deleteBingoMutation({
      variables: {
        id,
      },
    });
  };

  return {
    deleteBingo,
    data: data?.deleteBingo || null,
    error,
    loading,
  };
};
