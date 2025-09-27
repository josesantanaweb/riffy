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
  LOGOUT: '/logout',
};

import { Role } from '@riffy/types';

export interface MenuItem {
  label: string;
  icon: string;
  path: string;
  requiredRole?: Role;
  requiredRoles?: Role[];
}

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    path: ROUTES.DASHBOARD,
  },
  {
    label: 'Rifas',
    icon: 'gift',
    path: ROUTES.RAFFLES.LIST,
    requiredRoles: [Role.ADMIN, Role.OWNER],
  },
  {
    label: 'Dueños',
    icon: 'user',
    path: ROUTES.OWNERS.LIST,
    requiredRole: Role.ADMIN,
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
    requiredRole: Role.OWNER,
  },
  {
    label: 'Cerrar sesión',
    icon: 'logout',
    path: ROUTES.LOGOUT,
  },
];
