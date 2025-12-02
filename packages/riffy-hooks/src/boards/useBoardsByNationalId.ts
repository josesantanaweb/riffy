import { useQuery } from '@apollo/client';
import { GET_BOARDS_BY_NATIONAL_ID } from '@riffy/graphql';

export const useBoardsByNationalId = (bingoId: string, nationalId: string) => {
  const { data, error, loading } = useQuery(GET_BOARDS_BY_NATIONAL_ID, {
    variables: { bingoId, nationalId },
    skip: !nationalId || !bingoId,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.boardsByNationalId || null,
    bingo: data?.bingo || null,
    error,
    loading,
  };
};
