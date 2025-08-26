import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { fromPromise } from '@apollo/client/link/utils';
import { tokenStorage } from '@/utils/tokenStorage';
import { jwtDecode } from 'jwt-decode';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: string | null) => void; reject: (reason?: Error) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const createAuthLink = () => {
  const authLink = setContext(async (_, { headers }) => {
    if (typeof window === 'undefined') return { headers };

    let token = tokenStorage.getAccessToken();

    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const now = Date.now() / 1000;
        const timeUntilExpiry = decoded.exp - now;

        if (timeUntilExpiry < 30) {
          token = await refreshTokenIfNeeded();
        }
      } catch {
        token = await refreshTokenIfNeeded();
      }
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ networkError, operation, forward }) => {
    if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        return fromPromise(
          refreshTokenIfNeeded()
            .then((newToken) => {
              processQueue(null, newToken);
              return newToken;
            })
            .catch((error) => {
              processQueue(error, null);
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
              return null;
            })
            .finally(() => {
              isRefreshing = false;
            })
        ).flatMap((newToken) => {
          if (newToken) {
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                authorization: `Bearer ${newToken}`,
              },
            });
            return forward(operation);
          }
          return null;
        });
      }

      return fromPromise(
        new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
      ).flatMap(() => forward(operation));
    }
  });

  return { authLink, errorLink };
};

const refreshTokenIfNeeded = async (): Promise<string | null> => {
  try {
    const refreshToken = tokenStorage.getRefreshToken();
    const accessToken = tokenStorage.getAccessToken();

    if (!refreshToken || !accessToken) {
      throw new Error('No tokens available');
    }

    const decoded = jwtDecode<{ id: string }>(accessToken);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query RefreshToken($id: String!, $refreshToken: String!) {
            refreshToken(id: $id, refreshToken: $refreshToken) {
              accessToken
              refreshToken
              user { id email username name image }
            }
          }
        `,
        variables: {
          id: decoded.id,
          refreshToken,
        },
      }),
    });

    const data = await response.json();

    if (data.errors || !data.data?.refreshToken) {
      throw new Error('Refresh failed');
    }

    const authData = data.data.refreshToken;

    tokenStorage.setAccessToken(authData.accessToken);
    tokenStorage.setRefreshToken(authData.refreshToken);

    return authData.accessToken;
  } catch {
    tokenStorage.removeTokens();
    return null;
  }
};
