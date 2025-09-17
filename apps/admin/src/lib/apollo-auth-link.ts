import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { tokenStorage } from '@/utils/tokenStorage';
import { ROUTES } from '@/constants';

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
    const handleLogout = () => {
      if (typeof window !== 'undefined') {
        tokenStorage.removeTokens();

        window.location.href = ROUTES.LOGIN;
      }
    };

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        /* eslint-disable no-console */
        console.error(
          `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        const isAuthError =
          extensions?.code === 'UNAUTHENTICATED' ||
          message === 'Unauthorized' ||
          message.includes('Unauthorized') ||
          (extensions?.originalError &&
           typeof extensions.originalError === 'object' &&
           'statusCode' in extensions.originalError &&
           extensions.originalError.statusCode === 401);

        if (isAuthError) {
          console.warn('Error de autenticación detectado, cerrando sesión...');
          handleLogout();
        }
      });
    }

    if (networkError) {
      console.error('Network error:', networkError);

      if ('statusCode' in networkError && networkError.statusCode === 401) {
        console.warn('Error 401 detectado, cerrando sesión...');
        handleLogout();
      }
    }
  });

  return { authLink, errorLink };
};

