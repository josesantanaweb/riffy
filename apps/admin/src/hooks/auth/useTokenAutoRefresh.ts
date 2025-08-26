import { useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '@/utils/tokenStorage';

export const useTokenAutoRefresh = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  const refreshToken = async (): Promise<boolean> => {
    if (isRefreshingRef.current) return false;

    try {
      isRefreshingRef.current = true;

      const refreshTokenValue = tokenStorage.getRefreshToken();
      const accessToken = tokenStorage.getAccessToken();

      if (!refreshTokenValue || !accessToken) {
        return false;
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
            refreshToken: refreshTokenValue,
          },
        }),
      });

      const data = await response.json();

      if (data.errors || !data.data?.refreshToken) {
        return false;
      }

      const authData = data.data.refreshToken;
      tokenStorage.setAccessToken(authData.accessToken);
      tokenStorage.setRefreshToken(authData.refreshToken);

      return true;
    } catch {
      return false;
    } finally {
      isRefreshingRef.current = false;
    }
  };

  const checkAndRefreshToken = async () => {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) return;

    try {
      const decoded = jwtDecode<{ exp: number }>(accessToken);
      const now = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = decoded.exp - now;

      if (timeUntilExpiry <= 30) {
        const success = await refreshToken();
        if (!success) {
          if (typeof window !== 'undefined') {
            tokenStorage.removeTokens();
            window.location.href = '/login';
          }
        }
      }
    } catch {
      const success = await refreshToken();
      if (!success) {
        tokenStorage.removeTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
  };

  useEffect(() => {
    checkAndRefreshToken();

    intervalRef.current = setInterval(checkAndRefreshToken, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { refreshToken, checkAndRefreshToken };
};
