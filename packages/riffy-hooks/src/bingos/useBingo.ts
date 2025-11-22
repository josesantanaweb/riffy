import { useQuery } from '@apollo/client';
import { GET_BINGO } from '@riffy/graphql';

export const useBingo = (id: string) => {
  const { data, error, loading } = useQuery(GET_BINGO, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.bingo || null,
    error,
    loading,
  };
};
