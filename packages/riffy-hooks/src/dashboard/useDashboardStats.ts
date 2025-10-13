import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_STATS } from '@riffy/graphql';

export const useDashboardStats = () => {
  const { data, error, loading } = useQuery(GET_DASHBOARD_STATS, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.dashboardStats || null,
    error,
    loading,
  };
};
