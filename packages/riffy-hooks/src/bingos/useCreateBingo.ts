import { useMutation } from '@apollo/client';
import { CREATE_BINGO } from '@riffy/graphql';
import { CreateBingoInput } from '@riffy/types';

  export const useCreateBingo = () => {
  const [createBingoMutation, { data, error, loading }] = useMutation(
    CREATE_BINGO,
    {
      refetchQueries: ['Bingos'],
      awaitRefetchQueries: true,
    },
  );

  const createBingo = (input: CreateBingoInput) => {
    return createBingoMutation({
      variables: {
        input,
      },
    });
  };

  return {
    createBingo,
    data: data?.createBingo || null,
    error,
    loading,
  };
};
