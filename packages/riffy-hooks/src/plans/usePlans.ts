import { useQuery } from '@apollo/client';
import { GET_PLANS } from '@riffy/graphql';

export const usePlans = () => {
  const { data, error, loading } = useQuery(GET_PLANS, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.plans || null,
    error,
    loading,
  };
};
