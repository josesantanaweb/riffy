'use client';

import { useRole } from '@/hooks';
import { Role } from '@riffy/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: Role;
  requiredRoles?: Role[];
  fallbackPath?: string;
  showUnauthorized?: boolean;
}

export const RoleGuard = ({
  children,
  requiredRole,
  requiredRoles,
  fallbackPath = ROUTES.DASHBOARD,
  showUnauthorized = false,
}: RoleGuardProps) => {
  const { canAccess, hasAnyRole, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!requiredRole && !requiredRoles) return;

    let hasPermission = false;

    if (requiredRole) {
      hasPermission = canAccess(requiredRole);
    } else if (requiredRoles) {
      hasPermission = hasAnyRole(requiredRoles);
    }

    if (!hasPermission) {
      if (showUnauthorized) {
        return;
      } else {
        router.push(fallbackPath);
      }
    }
  }, [loading, requiredRole, requiredRoles, canAccess, hasAnyRole, router, fallbackPath, showUnauthorized]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  let hasPermission = true;

  if (requiredRole) {
    hasPermission = canAccess(requiredRole);
  } else if (requiredRoles) {
    hasPermission = hasAnyRole(requiredRoles);
  }

  if (!hasPermission) {
    if (showUnauthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-error mb-4">
              Acceso No Autorizado
            </h1>
            <p className="text-body-100 mb-6">
              No tienes permisos para acceder a esta sección.
            </p>
            <button
              className="bg-primary-500 text-white px-4 py-2 rounded-md"
              onClick={() => router.push(fallbackPath)}
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
};
