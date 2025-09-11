import { useQuery } from '@apollo/client';
import { GET_PAYMENT_METHOD } from '@riffy/graphql';

export const usePaymentMethod = (id: string) => {
  const { data, error, loading } = useQuery(GET_PAYMENT_METHOD, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.paymentMethod || null,
    error,
    loading,
  };
};
