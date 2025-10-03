import { useMutation } from '@apollo/client';
import { CREATE_PLAN } from '@riffy/graphql';
import { CreatePlanInput } from '@riffy/types';

export const useCreatePlan = () => {
  const [createPlanMutation, { data, error, loading }] = useMutation(
    CREATE_PLAN,
    {
      refetchQueries: ['Plans'],
      awaitRefetchQueries: true,
    },
  );

  const createPlan = (input: CreatePlanInput) => {
    return createPlanMutation({
      variables: {
        input,
      },
    });
  };

  return {
    createPlan,
    data: data?.createPlan || null,
    error,
    loading,
  };
};
