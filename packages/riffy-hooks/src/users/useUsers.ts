import { useQuery } from '@apollo/client';
import { GET_USERS } from '@riffy/graphql';
import { Role } from '@riffy/types';

export const useUsers = (role?: Role | null) => {
  const { data, error, loading } = useQuery(GET_USERS, {
    variables: { role },
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.users || null,
    error,
    loading,
  };
};
