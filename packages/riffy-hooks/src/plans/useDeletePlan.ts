import { useMutation } from '@apollo/client';
import { DELETE_PLAN } from '@riffy/graphql';

export const useDeletePlan = () => {
  const [deletePlanMutation, { data, error, loading }] = useMutation(
    DELETE_PLAN,
    {
      refetchQueries: ['Plans'],
      awaitRefetchQueries: true,
    },
  );

  const deletePlan = (id: string) => {
    return deletePlanMutation({
      variables: {
        id,
      },
    });
  };

  return {
    deletePlan,
    data: data?.deletePlan || null,
    error,
    loading,
  };
};
