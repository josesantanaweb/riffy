export const ROUTES = {
  HOME: '/',
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
};

export const MENU = [
  {
    label: 'Dashboard',
    icon: 'home',
    path: ROUTES.HOME,
  },
  {
    label: 'Rifas',
    icon: 'gift',
    path: ROUTES.RAFFLES.LIST,
  },
  {
    label: 'Dueños',
    icon: 'user',
    path: ROUTES.OWNERS,
  },
  // {
  //   label: 'Boletos',
  //   icon: 'ticket',
  //   path: ROUTES.TICKETS,
  // },
];
