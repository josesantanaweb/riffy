import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '@riffy/graphql';

export const useNotifications = () => {
  const { data, error, loading } = useQuery(GET_NOTIFICATIONS, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.notifications || null,
    error,
    loading,
  };
};
