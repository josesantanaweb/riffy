import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { tokenStorage } from '@/utils/tokenStorage';

export const createAuthLink = () => {
  const authLink = setContext(async (_, { headers }) => {
    if (typeof window === 'undefined') return { headers };

    const token = tokenStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        /* eslint-disable no-console */
        console.error(
          `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      if ('statusCode' in networkError && networkError.statusCode === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
  });

  return { authLink, errorLink };
};

