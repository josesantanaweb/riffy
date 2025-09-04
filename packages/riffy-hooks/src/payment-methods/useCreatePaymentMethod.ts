import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_METHOD } from '@riffy/graphql';
import { CreatePaymentMethodInput } from '@riffy/types';

export const useCreatePaymentMethod = () => {
  const [createPaymentMethodMutation, { data, error, loading }] = useMutation(
    CREATE_PAYMENT_METHOD,
    {
      refetchQueries: ['PaymentMethods'],
      awaitRefetchQueries: true,
    },
  );

  const createPaymentMethod = (input: CreatePaymentMethodInput) => {
    return createPaymentMethodMutation({
      variables: {
        input,
      },
    });
  };

  return {
    createPaymentMethod,
    data: data?.createPaymentMethod || null,
    error,
    loading,
  };
};
