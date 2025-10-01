import { useMutation } from '@apollo/client';
import { UPDATE_PLAN } from '@riffy/graphql';
import { UpdatePlanInput } from '@riffy/types';

export const useUpdatePlan= () => {
  const [updatePlanMutation, { data, error, loading }] = useMutation(
    UPDATE_PLAN,
    {
      refetchQueries: ['Plans'],
      awaitRefetchQueries: true,
    },
  );

  const updatePlan= (id: string, input: UpdatePlanInput) => {
    return updatePlanMutation({
      variables: {
        id,
        input,
      },
    });
  };

  return {
    updatePlan,
    data: data?.updatePlan|| null,
    error,
    loading,
  };
};
