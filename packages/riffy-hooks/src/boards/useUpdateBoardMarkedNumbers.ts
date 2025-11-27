import { useMutation } from '@apollo/client';
import { UPDATE_BOARD_MARKED_NUMBERS } from '@riffy/graphql';

export const useUpdateBoardMarkedNumbers = () => {
  const [updateMutation, { data, error, loading }] = useMutation(
    UPDATE_BOARD_MARKED_NUMBERS,
    {
      refetchQueries: ['BoardsByBingo'],
    },
  );

  const updateMarkedNumbers = (id: string, markedNumbers: number[][]) => {
    return updateMutation({
      variables: { id, markedNumbers },
    });
  };

  return {
    updateMarkedNumbers,
    data: data?.updateBoardMarkedNumbers || null,
    error,
    loading,
  };
};

