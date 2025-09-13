'use client';
import { Icon, Logo } from '@riffy/components';
import { useUserByDomain } from '@riffy/hooks';
import { useEffect } from 'react';
import { useStore } from '@/store';

const Navbar = () => {
  const { data: user, loading } = useUserByDomain('demo.com');
  const { setUser, setLoading } = useStore();

  useEffect(() => {
    setLoading(loading);
    if (user) {
      setUser(user);
      setLoading(false);
    }
  }, [user, loading]);

  const handleWhatsapp = () => {
    if (user?.whatsapp) {
      window.open(`https://wa.me/+58${user.whatsapp}`, '_blank');
    }
  };

  const handleInstagram = () => {
    if (user?.instagram) {
      window.open(`https://www.instagram.com/${user.instagram}`, '_blank');
    }
  };

  const handleTiktok = () => {
    if (user?.tiktok) {
      window.open(`https://www.tiktok.com/@${user.tiktok}`, '_blank');
    }
  };

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-5 bg-base-800">
      <Logo className="w-[64px]" src={user?.logo} loading={loading} />
      <div className="flex items-center gap-3">
        <Icon
          name="instagram"
          className="text-white text-2xl"
          onClick={handleInstagram}
        />
        <Icon
          name="tiktok"
          className="text-white text-2xl"
          onClick={handleTiktok}
        />
        <Icon
          name="whatsapp"
          className="text-white text-2xl"
          onClick={handleWhatsapp}
        />
      </div>
    </div>
  );
};

export default Navbar;
