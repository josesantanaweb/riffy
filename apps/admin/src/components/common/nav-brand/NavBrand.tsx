'use client';
import React from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { clsx } from 'clsx';
import { ASSETS } from '@/constants';

interface NavBrandProps {
  collapseSidebar: boolean;
}

const NavBrand = ({ collapseSidebar }: NavBrandProps): ReactElement => {
  const collapseClass = collapseSidebar ? 'max-w-[80px]' : 'max-w-[230px]';
  const logoSrc = collapseSidebar ? ASSETS.IMAGES.LOGO_SMALL : ASSETS.IMAGES.LOGO;

  return (
    <div
      className={clsx(
        'w-full transition-all justify-center flex items-center',
        collapseClass,
      )}
    >
      <Image
        src={logoSrc}
        alt="logo"
        width={117}
        height={30}
        className={`${collapseSidebar ? 'w-[24px]' : 'w-[74px]'} transition-all`}
      />
    </div>
  );
};

export default NavBrand;
