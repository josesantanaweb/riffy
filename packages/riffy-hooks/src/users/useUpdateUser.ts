import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@riffy/graphql';
import { CreateUserInput } from '@riffy/types';

export const useUpdateUser = () => {
  const [updateUserMutation, { data, error, loading }] = useMutation(
    UPDATE_USER,
    {
      refetchQueries: ['Users'],
      awaitRefetchQueries: true,
    },
  );

  const updateUser = (id: string, input: CreateUserInput) => {
    return updateUserMutation({
      variables: {
        id,
        input,
      },
    });
  };

  return {
    updateUser,
    data: data?.updateUser || null,
    error,
    loading,
  };
};
