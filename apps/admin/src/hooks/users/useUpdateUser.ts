import type { UpdateUserMutationVariables } from '@/__generated__/graphql';
import { useUpdateUserMutation } from '@/__generated__/graphql';

export const useUpdateUser = () => {
  const [updateUserMutation, { data, error, loading }] =
    useUpdateUserMutation();

  const updateUser = (
    id: UpdateUserMutationVariables['id'],
    input: UpdateUserMutationVariables['input'],
  ) => {
    return updateUserMutation({
      variables: {
        id,
        input,
      },
      refetchQueries: ['Profile'],
    });
  };

  return {
    updateUser,
    data,
    error,
    loading,
  };
};
