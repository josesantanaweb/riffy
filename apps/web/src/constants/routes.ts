export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  BINGOS: {
    LIST: '/bingos',
    BINGO: (id: string) => `/bingos/${id}`,
    VERIFY_TICKET: (id: string) => `/bingos/${id}/verify-board`,
  },
  PAYMENT: '/payment',
};
