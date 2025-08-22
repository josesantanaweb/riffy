export const publicRoutes = ['/rooms', '/sports', '/bets', '/bets/game', '/match', '/market', '/coinflip'];
export const authRoutes = ['/'];
export const apiAuthPrefix = '/api/auth';
export const DEFAULT_LOGIN_REDIRECT = '/';

export const isPublicRoute = (pathname: string) =>
  publicRoutes.includes(pathname) ||
  pathname.startsWith('/match/') ||
  pathname.startsWith('/market/');
