import { useProfile } from '@riffy/hooks';
import { Role } from '@riffy/types';

export const useRole = () => {
  const { data: profile, loading, error } = useProfile();

  const userRole = profile?.role;
  const isAdmin = userRole === Role.ADMIN;
  const isOwner = userRole === Role.OWNER;

  const hasRole = (role: Role) => {
    return userRole === role;
  };

  const hasAnyRole = (roles: Role[]) => {
    return roles.includes(userRole as Role);
  };

  const canAccess = (requiredRole: Role) => {
    if (isAdmin) return true;

    return hasRole(requiredRole);
  };

  const canManageUsers = () => {
    return isAdmin;
  };

  const canManageRaffles = () => {
    return isAdmin || isOwner;
  };

  const canManagePayments = () => {
    return isAdmin;
  };

  const canManagePaymentMethods = () => {
    return isAdmin || isOwner;
  };

  return {
    userRole,
    isAdmin,
    isOwner,
    loading,
    error,
    hasRole,
    hasAnyRole,
    canAccess,
    canManageUsers,
    canManageRaffles,
    canManagePayments,
    canManagePaymentMethods,
  };
};
