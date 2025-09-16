'use client';

import { useAuth } from '@riffy/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const AuthGuard = ({
  children,
  redirectTo = ROUTES.LOGIN,
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
