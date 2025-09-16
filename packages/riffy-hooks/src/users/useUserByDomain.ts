import { useQuery } from '@apollo/client';
import { GET_USER_BY_DOMAIN } from '@riffy/graphql';

export const useUserByDomain = (domain: string) => {
  const { data, error, loading } = useQuery(GET_USER_BY_DOMAIN, {
    variables: { domain },
    skip: !domain,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.userByDomain || null,
    error,
    loading,
  };
};
