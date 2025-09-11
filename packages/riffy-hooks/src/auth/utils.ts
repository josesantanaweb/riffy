export const TOKEN_KEY = 'accessToken';

const dispatchTokenChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tokenChange'));
  }
};

export const authentication = {
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
      dispatchTokenChange();
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },


  removeTokens: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      dispatchTokenChange();
    }
  },

  removeToken: (): void => {
    authentication.removeTokens();
  },

  hasTokens: (): boolean => {
    return !!authentication.getToken();
  },

  hasToken: (): boolean => {
    return !!authentication.getToken();
  },

  isAuthenticated: (): boolean => {
    const token = authentication.getToken();
    if (!token) return false;
    return true;
  },
};
