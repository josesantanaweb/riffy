import { useQuery } from '@apollo/client';
import { GET_RAFFLE } from '@riffy/graphql';

export const useRaffle = (id: string) => {
  const { data, error, loading } = useQuery(GET_RAFFLE, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.raffle || null,
    error,
    loading,
  };
};
