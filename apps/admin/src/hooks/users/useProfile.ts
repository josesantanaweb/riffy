import { useProfileQuery } from '@/__generated__/graphql';
import { useAuth } from '@/hooks/auth/useAuth';

export const useProfile = () => {
  const { isAuthenticated } = useAuth();
  const { data, error, loading } = useProfileQuery({
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
