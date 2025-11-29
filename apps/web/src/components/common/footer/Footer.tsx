'use client';

import Image from 'next/image';
import { ASSETS } from '@/constants';

const Footer = () => {
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
        © 2025 Bingly Para Gestion de Bingo Online. Todos los derechos
        reservados
      </p>
    </footer>
  );
};

export default Footer;
