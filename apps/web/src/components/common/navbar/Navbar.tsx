'use client';
import { Icon, Logo } from '@riffy/components';
import Link from 'next/link';
import { useUserByDomain } from '@riffy/hooks';
import { useEffect } from 'react';
import { useStore } from '@/store';

const Navbar = () => {
  const { data: user, loading } = useUserByDomain(String(process.env.NEXT_PUBLIC_DEFAULT_DOMAIN));
  const { setUser, setLoading } = useStore();

  useEffect(() => {
    setLoading(loading);
    if (user) {
      setUser(user);
      setLoading(false);
    }
  }, [user, loading]);

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-5 bg-base-800">
      <Logo className="w-[64px]" src={user?.logo} loading={loading} />
      <div className="flex items-center gap-3">
          <Link
            href={`https://www.instagram.com/${user?.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-300 transition-colors"
          >
            <Icon name="instagram" className="text-white text-2xl" />
          </Link>
          <Link
            href={`https://www.tiktok.com/@${user?.tiktok}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-300 transition-colors"
          >
            <Icon name="tiktok" className="text-white text-2xl" />
          </Link>
          <Link
            href={`https://wa.me/+58${user?.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-300 transition-colors"
          >
            <Icon name="whatsapp" className="text-white text-2xl" />
          </Link>
      </div>
    </div>
  );
};

export default Navbar;
