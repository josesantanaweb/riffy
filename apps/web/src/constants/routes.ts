export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  RAFFLES: {
    LIST: '/raffles',
    RAFFLE: (id: string) => `/raffles/${id}`,
    VERIFY_TICKET: (id: string) => `/raffles/${id}/verify-ticket`,
  },
  PAYMENT: '/payment',
};
