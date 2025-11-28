import { useMutation } from '@apollo/client';
import { UPDATE_BOARD_STATUS } from '@riffy/graphql';
import { BoardStatus } from '@riffy/types';

export const useUpdateBoardStatus = () => {
  const [updateBoardStatusMutation, { data, error, loading }] = useMutation(
    UPDATE_BOARD_STATUS,
    {
      refetchQueries: ['BoardsByBingo'],
      awaitRefetchQueries: true,
    },
  );

  const updateBoardStatus = (id: string, status: BoardStatus) => {
    return updateBoardStatusMutation({
      variables: {
        id,
        status,
      },
    });
  };

  return {
    updateBoardStatus,
    data: data?.updateBoardStatus || null,
    error,
    loading,
  };
};
