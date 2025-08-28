import { useQuery } from '@apollo/client';
import { GET_RAFFLES } from '@/api/graphql/queries/raffles';

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
