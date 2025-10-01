import { useQuery } from '@apollo/client';
import { GET_PLAN } from '@riffy/graphql';

export const usePlan = (id: string) => {
  const { data, error, loading } = useQuery(GET_PLAN, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.plan || null,
    error,
    loading,
  };
};
