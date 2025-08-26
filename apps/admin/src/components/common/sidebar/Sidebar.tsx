'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

import { ROUTES } from '@/constants/routes';
import { useStore } from '@/store';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { collapseSidebar } = useStore();

  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const collapseClass = collapseSidebar ? 'max-w-[80px]' : 'max-w-[260px]';

  return (
    <div
      className={clsx(
        'w-full bg-base-700 h-screen transition-all',
        collapseClass,
      )}
    >
      <div className="flex flex-col py-6 justify-center items-center">
        <span className="mb-2 px-4 h-20 uppercase text-sm text-base-300 font-medium text-left w-full">Menu</span>
        <div className="flex flex-col w-full items-center">
          {Object.values(ROUTES).map((item: any) => (
            <SidebarItem
              key={item.label || item.ROOT || item}
              item={item}
              isOpen={openDropdowns.has(item.label || item.ROOT || item)}
              toggleDropdown={toggleDropdown}
              isCollapse={collapseSidebar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
