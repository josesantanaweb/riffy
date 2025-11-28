import { useMutation } from '@apollo/client';
import { UPDATE_BINGO } from '@riffy/graphql';
import { UpdateBingoInput } from '@riffy/types';

  export const useUpdateBingo = () => {
  const [updateBingoMutation, { data, error, loading }] = useMutation(
    UPDATE_BINGO,
    {
      refetchQueries: ['Bingos'],
      awaitRefetchQueries: true,
    },
  );

  const updateBingo = (id: string, input: UpdateBingoInput) => {
    return updateBingoMutation({
      variables: {
        id,
        input,
      },
    });
  };

  return {
    updateBingo,
    data: data?.updateBingo || null,
    error,
    loading,
  };
};
