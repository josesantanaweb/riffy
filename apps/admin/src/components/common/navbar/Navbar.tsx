'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import NavUser from '../nav-user';
import Notifications from '../notifications';
import NavBrand from '../nav-brand';
import { useStore } from '@/store';
import { useProfile } from '@riffy/hooks';

const Navbar = (): ReactElement => {
  const { data: profile } = useProfile();
  const { setCollapseSidebar, collapseSidebar, toggleMobileSidebar } = useStore();

  return (
    <div className="w-full h-[52px] flex-shrink-0 bg-base-700 flex justify-between items-center">
      <NavBrand collapseSidebar={collapseSidebar} />
      <div className="flex items-center w-full h-full gap-3 pr-6 lg:px-6 justify-between">
        <Icon
          name="menu"
          className="text-base-300 cursor-pointer hover:text-white transition-colors lg:hidden"
          onClick={toggleMobileSidebar}
        />
        <Icon
          name="menu"
          className="text-base-300 cursor-pointer hover:text-white transition-colors hidden lg:block"
          onClick={() => setCollapseSidebar(!collapseSidebar)}
        />
        <div className="flex gap-6 items-center h-full">
          <Notifications />
          <NavUser profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
