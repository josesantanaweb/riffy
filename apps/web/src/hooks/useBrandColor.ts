import { useEffect } from 'react';
import { useStore } from '@/store';

export const useBrandColor = () => {
  const { user } = useStore();

  useEffect(() => {
    if (user?.brandColor) {
      document.documentElement.style.setProperty('--color-primary-500', `${user.brandColor}`);
    }
  }, [user, user?.brandColor]);
};
