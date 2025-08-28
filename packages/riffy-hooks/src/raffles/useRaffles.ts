import { useQuery } from '@apollo/client';
import { GET_RAFFLES } from '@riffy/graphql';

export const useRaffles = () => {
  const { data, error, loading } = useQuery(GET_RAFFLES, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.raffles || null,
    error,
    loading,
  };
};
