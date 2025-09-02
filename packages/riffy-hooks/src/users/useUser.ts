import { useQuery } from '@apollo/client';
import { GET_USER } from '@riffy/graphql';

export const useUser = (id: string) => {
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.user || null,
    error,
    loading,
  };
};
