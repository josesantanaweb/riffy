'use client';

import { useEffect } from 'react';
import { useAuth } from '@riffy/hooks';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

interface PublicGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicGuard = ({ children, redirectTo = ROUTES.HOME }: PublicGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
