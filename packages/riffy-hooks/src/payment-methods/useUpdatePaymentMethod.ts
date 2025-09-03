import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_METHOD } from '@riffy/graphql';
import { UpdatePaymentMethodInput } from '@riffy/types';

export const useUpdatePaymentMethod = () => {
  const [updatePaymentMethodMutation, { data, error, loading }] = useMutation(
    UPDATE_PAYMENT_METHOD,
    {
      refetchQueries: ['PaymentMethods'],
      awaitRefetchQueries: true,
    },
  );

  const updatePaymentMethod = (id: string, input: UpdatePaymentMethodInput) => {
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
