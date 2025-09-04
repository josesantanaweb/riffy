import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT } from '@riffy/graphql';
import { UpdatePaymentInput } from '@riffy/types';

export const useUpdatePayment = () => {
  const [updatePaymentMutation, { data, error, loading }] = useMutation(
    UPDATE_PAYMENT,
    {
      refetchQueries: ['Payments'],
      awaitRefetchQueries: true,
    },
  );

  const updatePayment = (id: string, input: UpdatePaymentInput) => {
    return updatePaymentMutation({
      variables: {
        id,
        input,
      },
    });
  };

  return {
    updatePayment,
    data: data?.updatePayment || null,
    error,
    loading,
  };
};
