'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import NavUser from '../nav-user';
import Notifications from '../notifications';
import { useStore } from '@/store';
import { useProfile } from '@riffy/hooks';
import ThemeToggle from '../theme-toggle';

const Navbar = (): ReactElement => {
  const { data: profile } = useProfile();
  const { setCollapseSidebar, collapseSidebar, toggleMobileSidebar } = useStore();

  return (
    <div className="w-full h-[52px] flex-shrink-0 dark:bg-base-700 bg-base-800 flex items-center sticky top-0 left-0 z-50">
      <div className="flex items-center w-full gap-3 px-6 justify-between">
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
        <div className="flex gap-2 items-center h-full">
          <ThemeToggle />
          <Notifications />
          <NavUser profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
