import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_STATUS } from '@riffy/graphql';
import { PaymentStatus } from '@riffy/types';

export const useUpdatePaymentStatus = () => {
  const [updatePaymentMutation, { data, error, loading }] = useMutation(
    UPDATE_PAYMENT_STATUS,
    {
      refetchQueries: ['Payments'],
      awaitRefetchQueries: true,
    },
  );

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    return updatePaymentMutation({
      variables: {
        id,
        status,
      },
    });
  };

  return {
    updatePaymentStatus,
    data: data?.updatePaymentStatus || null,
    error,
    loading,
  };
};
