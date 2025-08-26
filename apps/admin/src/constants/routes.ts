export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RAFFLES: '/raffles',
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
    path: ROUTES.RAFFLES,
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
