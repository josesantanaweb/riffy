'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

import { MENU } from '@/constants/routes';
import { useStore } from '@/store';
import SidebarItem from './SidebarItem';
import { IconName } from '@riffy/components';

const Sidebar: React.FC = () => {
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

  const sidebarClasses = clsx(
    'w-full bg-base-700 min-h-screen transition-all pt-10 flex-shrink-0',
    collapseSidebar ? 'max-w-[80px]' : 'max-w-[230px]',
  );

  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col justify-center items-center">
        {!collapseSidebar && (
          <span className="mb-2 px-4 uppercase text-sm text-base-300 font-medium text-left w-full">
            Menu
          </span>
        )}

        <div className="flex flex-col w-full items-center">
          {MENU.map(item => (
            <SidebarItem
              key={item.label}
              item={{ ...item, icon: item.icon as IconName }}
              isOpen={openDropdowns.has(item.label)}
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
