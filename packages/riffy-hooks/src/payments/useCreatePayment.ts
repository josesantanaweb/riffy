import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT } from '@riffy/graphql';
import { CreatePaymentInput } from '@riffy/types';

export const useCreatePayment = () => {
  const [createPaymentMutation, { data, error, loading }] = useMutation(
    CREATE_PAYMENT,
    {
      refetchQueries: ['Payments', 'UserByDomain'],
      awaitRefetchQueries: true,
    },
  );

  const createPayment = (input: CreatePaymentInput) => {
    return createPaymentMutation({
      variables: {
        input,
      },
    });
  };

  return {
    createPayment,
    data: data?.createPayment || null,
    error,
    loading,
  };
};
