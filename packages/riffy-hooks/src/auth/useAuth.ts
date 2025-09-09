import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@riffy/graphql';
import { LoginInput } from '@riffy/types';
import { authentication } from './utils';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation, { data, error, loading: loginLoading }] = useMutation(
    LOGIN,
    {
      onCompleted: data => {
        if (data?.login?.accessToken) {
          authentication.setToken(data.login.accessToken);

          setIsAuthenticated(true);
        }
      },
      onError: error => {
        authentication.removeTokens();
        setIsAuthenticated(false);
      },
    },
  );

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const authenticated = authentication.isAuthenticated();
        setIsAuthenticated(authenticated);
      }
      setIsLoading(false);
    };

    checkAuth();

    if (typeof window !== 'undefined') {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'accessToken') {
          checkAuth();
        }
      };

      const handleTokenChange = () => {
        checkAuth();
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('tokenChange', handleTokenChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('tokenChange', handleTokenChange);
      };
    }
  }, []);

  const login = async (input: LoginInput) => {
    try {
      const result = await loginMutation({
        variables: {
          input,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authentication.removeTokens();
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return authentication.getToken();
  };

  return {
    isAuthenticated,
    isLoading,

    login,
    logout,
    getToken,

    loginData: data?.login || null,
    loginError: error,
    loginLoading,
  };
};
