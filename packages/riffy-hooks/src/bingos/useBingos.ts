import { useQuery } from '@apollo/client';
import { GET_BINGOS } from '@riffy/graphql';

export const useBingos = () => {
  const { data, error, loading } = useQuery(GET_BINGOS, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.bingos || null,
    error,
    loading,
  };
};
