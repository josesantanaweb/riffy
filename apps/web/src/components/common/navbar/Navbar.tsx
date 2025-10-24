'use client';
import { Icon, Logo } from '@riffy/components';
import Link from 'next/link';
import { useUserByDomain } from '@riffy/hooks';
import { useEffect } from 'react';
import { useStore } from '@/store';

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
        <Link
          href={`https://www.instagram.com/${user?.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="instagram" className="text-body-100 text-2xl" />
        </Link>
        <Link
          href={`https://www.tiktok.com/@${user?.tiktok}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="tiktok" className="text-body-100 text-2xl" />
        </Link>
        <button
          onClick={() =>
            window.open(`https://wa.me/+58${user?.whatsapp}`, '_blank')
          }
          className="cursor-pointer"
        >
          <Icon name="whatsapp" className="text-body-100 text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
