import { useQuery } from '@apollo/client';
import { GET_RAFFLES_BY_DOMAIN } from '@riffy/graphql';

export const useRafflesByDomain = () => {
  const { data, error, loading } = useQuery(GET_RAFFLES_BY_DOMAIN, {
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.rafflesByDomain || null,
    error,
    loading,
  };
};
