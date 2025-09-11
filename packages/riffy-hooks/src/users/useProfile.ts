import { useQuery } from '@apollo/client';
import { useAuth } from '../auth/useAuth';
import { GET_PROFILE } from '@riffy/graphql';

export const useProfile = () => {
  const { isAuthenticated } = useAuth();
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {},
    fetchPolicy: 'network-only',
    skip: !isAuthenticated,
  });

  return {
    data: data?.profile || null,
    error,
    loading,
  };
};
