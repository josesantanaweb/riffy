export const ROUTES = {
  DASHBOARD: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RAFFLES: {
    LIST: '/raffles',
    CREATE: '/raffles/create',
    EDIT: (id: string) => `/raffles/edit/${id}`,
  },
  OWNERS: {
    LIST: '/owners',
    CREATE: '/owners/create',
    EDIT: (id: string) => `/owners/edit/${id}`,
  },
  TICKETS: {
    LIST: (raffleId: string) => `/raffles/${raffleId}/tickets`,
  },
  PAYMENTS: {
    LIST: `/payments`,
    CREATE: '/payments/create',
  },
  PAYMENT_METHODS: {
    LIST: `/payment-methods`,
    CREATE: '/payment-methods/create',
    EDIT: (id: string) => `/payment-methods/edit/${id}`,
  },
};

export const MENU = [
  {
    label: 'Dashboard',
    icon: 'home',
    path: ROUTES.DASHBOARD,
  },
  {
    label: 'Rifas',
    icon: 'gift',
    path: ROUTES.RAFFLES.LIST,
  },
  {
    label: 'Dueños',
    icon: 'user',
    path: ROUTES.OWNERS.LIST,
  },
  {
    label: 'Pagos',
    icon: 'dollar',
    path: ROUTES.PAYMENTS.LIST,
  },
  {
    label: 'Metodos de pago',
    icon: 'credit-card',
    path: ROUTES.PAYMENT_METHODS.LIST,
  },
];
