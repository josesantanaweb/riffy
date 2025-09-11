'use client';
import { ASSETS } from '@/constants/assets';
import { Icon, Logo } from '@riffy/components';

const Navbar = () => {
  return (
    <div className="w-full h-[70px] flex items-center justify-between px-5 bg-base-800">
      <Logo className="w-[64px]" src={ASSETS.IMAGES.LOGO} />
      <div className="flex items-center gap-3">
        <Icon name="instagram" className="text-white text-2xl" />
        <Icon name="tiktok" className="text-white text-2xl" />
        <Icon name="whatsapp" className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
