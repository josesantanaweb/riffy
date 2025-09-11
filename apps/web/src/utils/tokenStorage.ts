const dispatchTokenChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tokenChange'));
  }
};

export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  },

  setAccessToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      document.cookie = `accessToken=${token}; path=/; max-age=86400; secure; samesite=strict`;
      dispatchTokenChange();
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', token);
      document.cookie = `refreshToken=${token}; path=/; max-age=604800; secure; samesite=strict`;
      dispatchTokenChange();
    }
  },

  removeTokens: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      dispatchTokenChange();
    }
  },

  hasTokens: (): boolean => {
    return !!(tokenStorage.getAccessToken() && tokenStorage.getRefreshToken());
  }
};
