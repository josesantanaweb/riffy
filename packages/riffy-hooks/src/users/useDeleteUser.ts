import { useMutation } from '@apollo/client';
import { DELETE_USER } from '@riffy/graphql';

export const useDeleteUser = () => {
  const [deleteUserMutation, { data, error, loading }] = useMutation(
    DELETE_USER,
    {
      refetchQueries: ['Users'],
      awaitRefetchQueries: true,
    },
  );

  const deleteUser = (id: string) => {
    return deleteUserMutation({
      variables: {
        id,
      },
    });
  };

  return {
    deleteUser,
    data: data?.deleteUser || null,
    error,
    loading,
  };
};
