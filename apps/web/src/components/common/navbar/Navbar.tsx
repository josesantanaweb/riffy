'use client';
import { useEffect, useState } from 'react';

import { useStore } from '@/store';
import { useUserByDomain } from '@riffy/hooks';
import { Logo } from '@riffy/components';
import SocialLink from './social-link';

const Navbar = () => {
  const { setUser, setLoading } = useStore();
  const [domain, setDomain] = useState<string>('');
  const { data: user, loading } = useUserByDomain(domain);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const cleanDomain = hostname.replace(/^www\./, '');
      setDomain(cleanDomain);
    }
  }, []);

  useEffect(() => {
    setLoading(loading);
    if (user) {
      setUser(user);
      setLoading(false);
    }
  }, [user, loading]);

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-5 bg-navbar-bg shrink-0">
      <Logo
        className={user?.isRoundedLogo ? 'w-12' : 'w-[110px]'}
        src={user?.logo}
        loading={loading}
        isRounded={user?.isRoundedLogo}
      />
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
