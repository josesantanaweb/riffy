import { useMutation } from '@apollo/client';
import { CREATE_RAFFLE } from '@riffy/graphql';

export const useCreateRaffle = () => {
  const [createRaffle, { data, error, loading }] = useMutation(CREATE_RAFFLE, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    createRaffle,
    data: data?.createRaffle || null,
    error,
    loading,
  };
};
