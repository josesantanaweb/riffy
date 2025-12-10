'use client';

import Image from 'next/image';
import { ASSETS } from '@/constants';
import { getVersion } from '@riffy/utils';

const Footer = () => {
  const version = getVersion();

  return (
    <footer className="w-full flex items-center flex-col justify-center gap-5 py-5">
      <div className="flex items-center gap-10 justify-between">
        <div className="w-[64px]">
          <Image
            src={ASSETS.IMAGES.CONALOT}
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[30px]">
          <Image
            src={ASSETS.IMAGES.KINO}
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[30px]">
          <Image
            src={ASSETS.IMAGES.SUPER_GANA}
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <p className="text-body-100 text-xs text-center max-w-[300px]">
        © 2025 Riffy Para Gestion de Rifas Online. Todos los derechos
        reservados v{version}
      </p>
    </footer>
  );
};

export default Footer;
