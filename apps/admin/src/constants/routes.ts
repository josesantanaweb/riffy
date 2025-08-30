export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RAFFLES: {
    LIST: '/raffles',
    CREATE: '/raffles/create',
    EDIT: (id: string) => `/raffles/edit/${id}`,
  },
  CUSTOMERS: '/customers',
  TICKETS: '/tickets',
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
    label: 'Clientes',
    icon: 'user',
    path: ROUTES.CUSTOMERS,
  },
  {
    label: 'Boletos',
    icon: 'ticket',
    path: ROUTES.TICKETS,
  },
] ;
