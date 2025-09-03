import { useQuery } from '@apollo/client';
import { GET_PAYMENT } from '@riffy/graphql';

export const usePayment = (id: string) => {
  const { data, error, loading } = useQuery(GET_PAYMENT, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.payment || null,
    error,
    loading,
  };
};
