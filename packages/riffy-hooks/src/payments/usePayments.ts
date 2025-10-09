import { useQuery } from '@apollo/client';
import { GET_PAYMENTS } from '@riffy/graphql';

export const usePayments = (raffleId?: string) => {
  const { data, error, loading } = useQuery(GET_PAYMENTS, {
    variables: { raffleId },
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.payments || null,
    error,
    loading,
  };
};
