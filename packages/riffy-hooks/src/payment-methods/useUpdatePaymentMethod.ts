import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_METHOD } from '@riffy/graphql';
import { CreatePaymentMethodInput } from '@riffy/types';

export const useUpdatePaymentMethod = () => {
  const [updatePaymentMethodMutation, { data, error, loading }] = useMutation(
    UPDATE_PAYMENT_METHOD,
    {
      refetchQueries: ['PaymentMethods'],
      awaitRefetchQueries: true,
    },
  );

  const updatePaymentMethod = (id: string, input: CreatePaymentMethodInput) => {
    return updatePaymentMethodMutation({
      variables: {
        id,
        input,
      },
    });
  };

  return {
    updatePaymentMethod,
    data: data?.updatePaymentMethod || null,
    error,
    loading,
  };
};
