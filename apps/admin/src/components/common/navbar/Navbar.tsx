'use client';
import React from 'react';
import type { ReactElement } from 'react';
import Icon from '@/components/common/icon';
import { useStore } from '@/store';
import NavUser from '../nav-user';
import NavNotification from '../nav-notifications';
import NavBrand from '../nav-brand';

const Navbar = (): ReactElement => {
  const { setCollapseSidebar, collapseSidebar } = useStore();

  return (
    <div className="w-full h-[52px] bg-base-700 flex justify-between items-center">
      <NavBrand collapseSidebar={collapseSidebar} />
      <div className="flex items-center w-full h-full gap-3 px-6 justify-between">
        <Icon
          name="menu"
          className="text-base-300"
          onClick={() => setCollapseSidebar(!collapseSidebar)}
        />
        <div className="flex gap-6 items-center">
          <NavNotification />
          <NavUser name="Riffy" role="Administrador" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
