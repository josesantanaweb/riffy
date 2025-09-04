import { useMutation } from '@apollo/client';
import { DELETE_PAYMENT_METHOD } from '@riffy/graphql';

export const useDeletePaymentMethod = () => {
  const [deletePaymentMethodMutation, { data, error, loading }] = useMutation(
    DELETE_PAYMENT_METHOD,
    {
      refetchQueries: ['PaymentMethods'],
      awaitRefetchQueries: true,
    },
  );

  const deletePaymentMethod = (id: string) => {
    return deletePaymentMethodMutation({
      variables: {
        id,
      },
    });
  };

  return {
    deletePaymentMethod,
    data: data?.deletePaymentMethod || null,
    error,
    loading,
  };
};
