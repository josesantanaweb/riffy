import { useRafflesQuery } from '@/__generated__/graphql';
// import { useAuth } from '@/hooks/auth/useAuth';

export const useRaffles = () => {
  // const { isAuthenticated } = useAuth();
  const { data, error, loading } = useRafflesQuery({
    variables: {},
    fetchPolicy: 'network-only',
    // skip: !isAuthenticated,
  });

  return {
    data: data?.raffles || null,
    error,
    loading,
  };
};
