import { useQuery } from '@apollo/client';
import { GET_PAYMENT_BY_NATIONAL_ID } from '@riffy/graphql';

export const usePaymentByNationalId = (nationalId: string) => {
  const { data, error, loading } = useQuery(GET_PAYMENT_BY_NATIONAL_ID, {
    variables: { nationalId },
    skip: !nationalId,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.paymentByNationalId || null,
    error,
    loading,
  };
};
