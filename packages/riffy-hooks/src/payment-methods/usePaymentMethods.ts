import { useQuery } from '@apollo/client';
import { GET_PAYMENT_METHODS } from '@riffy/graphql';

export const usePaymentMethods = () => {
  const { data, error, loading } = useQuery(GET_PAYMENT_METHODS, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.paymentMethods || null,
    error,
    loading,
  };
};
