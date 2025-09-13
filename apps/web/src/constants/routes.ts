export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  RAFFLES: {
    LIST: '/raffles',
    RAFFLE: (id: string) => `/raffles/${id}`,
  },
  PAYMENT: '/payment',
};
