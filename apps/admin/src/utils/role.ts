import { Role } from '@riffy/types';

export const hasRole = (userRole: Role | null | undefined, requiredRole: Role): boolean => {
  return userRole === requiredRole;
};

export const hasAnyRole = (userRole: Role | null | undefined, requiredRoles: Role[]): boolean => {
  return requiredRoles.includes(userRole as Role);
};

export const canAccess = (userRole: Role | null | undefined, requiredRole: Role): boolean => {
  if (userRole === Role.ADMIN) return true;

  return hasRole(userRole, requiredRole);
};

export const canAccessAny = (userRole: Role | null | undefined, requiredRoles: Role[]): boolean => {
  if (userRole === Role.ADMIN) return true;

  return hasAnyRole(userRole, requiredRoles);
};

export const canManageUsers = (userRole: Role | null | undefined): boolean => {
  return userRole === Role.ADMIN;
};

export const canManageRaffles = (userRole: Role | null | undefined): boolean => {
  return userRole === Role.ADMIN || userRole === Role.OWNER;
};

export const canManagePayments = (userRole: Role | null | undefined): boolean => {
  return userRole === Role.ADMIN;
};

export const canManagePaymentMethods = (userRole: Role | null | undefined): boolean => {
  return userRole === Role.ADMIN || userRole === Role.OWNER;
};

export const filterMenuByRole = <T extends { requiredRole?: Role; requiredRoles?: Role[] }>(
  menuItems: T[],
  userRole: Role | null | undefined
): T[] => {
  return menuItems.filter(item => {
    if (!item.requiredRole && !item.requiredRoles) return true;

    if (item.requiredRole) {
      return canAccess(userRole, item.requiredRole);
    }

    if (item.requiredRoles) {
      return canAccessAny(userRole, item.requiredRoles);
    }

    return true;
  });
};

export const roleLabel = (role: Role): string => {
  switch (role) {
    case Role.ADMIN:
      return 'Administrador';
    case Role.OWNER:
      return 'Dueño de Rifa';
    default:
      return 'Usuario';
  }
};
