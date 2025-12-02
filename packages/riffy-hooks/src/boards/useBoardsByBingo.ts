import { useQuery } from '@apollo/client';
import { GET_BOARDS_BY_BINGO } from '@riffy/graphql';

export const useBoardsByBingo = (bingoId: string) => {
  const { data, error, loading } = useQuery(GET_BOARDS_BY_BINGO, {
    variables: { bingoId },
    skip: !bingoId,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.boardsByBingo || null,
    error,
    loading,
  };
};
