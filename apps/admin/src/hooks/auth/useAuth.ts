import { useMutation, useLazyQuery } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import {
  LOGIN,
  REGISTER,
  REFRESH_TOKEN,
  LOGOUT,
} from '@/api/graphql/mutations/auth';
import { tokenStorage } from '@/utils/tokenStorage';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
  username: string;
  code?: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);
  const [logoutMutation] = useMutation(LOGOUT);
  const [refreshTokenQuery] = useLazyQuery(REFRESH_TOKEN);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    const token = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    if (!token || !refreshToken) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number } & User>(token);
      const refreshDecoded = jwtDecode<{ exp: number }>(refreshToken);
      const now = Math.floor(Date.now() / 1000);

      if (refreshDecoded.exp <= now) {
        tokenStorage.removeTokens();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setCurrentUser({
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        name: decoded.name,
        image: decoded.image,
      });
      setIsLoading(false);
    } catch {
      tokenStorage.removeTokens();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();

    const handleTokenChange = () => {
      checkAuthStatus();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'refreshToken') {
        checkAuthStatus();
      }
    };

    window.addEventListener('tokenChange', handleTokenChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('tokenChange', handleTokenChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuthStatus]);

  const login = async (input: LoginInput): Promise<AuthResponse> => {
    const { data } = await loginMutation({
      variables: { input },
    });

    const authData = data.login;

    tokenStorage.setAccessToken(authData.accessToken);
    tokenStorage.setRefreshToken(authData.refreshToken);

    return authData;
  };

  const register = async (input: RegisterInput): Promise<AuthResponse> => {
    const { data } = await registerMutation({
      variables: { input },
    });

    const authData = data.register;

    tokenStorage.setAccessToken(authData.accessToken);
    tokenStorage.setRefreshToken(authData.refreshToken);

    return authData;
  };

  const logout = async (userId: string): Promise<void> => {
    try {
      await logoutMutation({
        variables: { id: userId },
      });

      tokenStorage.removeTokens();
    } catch {
      tokenStorage.removeTokens();
      throw new Error('Logout failed');
    }
  };

  const refreshAccessToken = async (): Promise<AuthResponse | null> => {
    try {
      const refreshToken = tokenStorage.getRefreshToken();
      const accessToken = tokenStorage.getAccessToken();

      if (!refreshToken || !accessToken) {
        throw new Error('No refresh token available');
      }

      const decoded = jwtDecode<{ id: string }>(accessToken);

      const { data } = await refreshTokenQuery({
        variables: {
          id: decoded.id,
          refreshToken,
        },
      });

      const authData = data.refreshToken;

      tokenStorage.setAccessToken(authData.accessToken);
      tokenStorage.setRefreshToken(authData.refreshToken);

      return authData;
    } catch {
      tokenStorage.removeTokens();
      return null;
    }
  };

  const getCurrentUser = (): User | null => {
    return currentUser;
  };

  const testRefreshToken = async () => {
    const result = await refreshAccessToken();
    if (result) {
      checkAuthStatus();
    }
  };

  return {
    login,
    register,
    logout,
    refreshAccessToken,
    isAuthenticated,
    getCurrentUser,
    testRefreshToken,
    isLoading,
  };
};
