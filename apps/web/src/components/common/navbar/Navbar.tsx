'use client';
import { useEffect } from 'react';

import { useStore } from '@/store';
import { useUserByDomain } from '@riffy/hooks';
import { Logo } from '@riffy/components';
import SocialLink from './social-link';

const Navbar = () => {
  const { data: user, loading } = useUserByDomain(
    String(process.env.NEXT_PUBLIC_DEFAULT_DOMAIN),
  );
  const { setUser, setLoading } = useStore();

  useEffect(() => {
    setLoading(loading);
    if (user) {
      setUser(user);
      setLoading(false);
    }
  }, [user, loading]);

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-5 bg-navbar-bg">
      <Logo className="w-[64px]" src={user?.logo} loading={loading} />
      <div className="flex items-center gap-3">
        {user?.instagram && (
          <SocialLink
            href={`https://www.instagram.com/${user.instagram}`}
            icon="instagram"
          />
        )}
        {user?.tiktok && (
          <SocialLink
            href={`https://www.tiktok.com/@${user.tiktok}`}
            icon="tiktok"
          />
        )}
        {user?.whatsapp && (
          <SocialLink
            href={`https://wa.me/+58${user.whatsapp}`}
            icon="whatsapp"
            type="whatsapp"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
