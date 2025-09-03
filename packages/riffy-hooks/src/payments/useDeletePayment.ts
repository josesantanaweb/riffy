import { useMutation } from '@apollo/client';
import { DELETE_PAYMENT } from '@riffy/graphql';

export const useDeletePayment = () => {
  const [deletePaymentMutation, { data, error, loading }] = useMutation(
    DELETE_PAYMENT,
    {
      refetchQueries: ['Payments'],
      awaitRefetchQueries: true,
    },
  );

  const deletePayment = (id: string) => {
    return deletePaymentMutation({
      variables: {
        id,
      },
    });
  };

  return {
    deletePayment,
    data: data?.deletePayment || null,
    error,
    loading,
  };
};
