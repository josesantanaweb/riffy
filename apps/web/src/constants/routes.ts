export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  RAFFLES: {
    LIST: '/bingos',
    RAFFLE: (id: string) => `/bingos/${id}`,
    VERIFY_TICKET: (id: string) => `/bingos/${id}/verify-board`,
  },
  PAYMENT: '/payment',
};
