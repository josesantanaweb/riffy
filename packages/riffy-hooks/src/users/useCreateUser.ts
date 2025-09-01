import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@riffy/graphql';
import { CreateUserInput } from '@riffy/types';

export const useCreateUser = () => {
  const [createUserMutation, { data, error, loading }] = useMutation(
    CREATE_USER,
    {
      refetchQueries: ['Users'],
      awaitRefetchQueries: true,
    },
  );

  const createUser = (input: CreateUserInput) => {
    return createUserMutation({
      variables: {
        input,
      },
    });
  };

  return {
    createUser,
    data: data?.createUser || null,
    error,
    loading,
  };
};
