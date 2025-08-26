'use client';
import React from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { clsx } from 'clsx';
import { useStore } from '@/store';

interface NavBrandProps {
  collapseSidebar: boolean;
}

const NavBrand = ({ collapseSidebar }: NavBrandProps): ReactElement => {
  const collapseClass = collapseSidebar ? 'max-w-[80px]' : 'max-w-[260px]';

  return (
    <div
      className={clsx(
        'w-full transition-all justify-center flex items-center',
        collapseClass,
      )}
    >
      <Image
        src={`/images/${collapseSidebar ? 'logo-small' : 'logo'}.svg`}
        alt="logo"
        width={117}
        height={30}
        className={`${collapseSidebar ? 'w-[24px]' : 'w-[74px]'} transition-all`}
      />
    </div>
  );
};

export default NavBrand;
