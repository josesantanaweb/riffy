'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';

import SidebarSubmenu from './SidebarSubmenu';
import { Icon } from '@riffy/components';
import { Item } from './types';

interface SidebarItemProps {
  item: Item;
  isOpen: boolean;
  toggleDropdown: (label: string) => void;
  isCollapse: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isOpen,
  toggleDropdown,
  isCollapse,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = item.path && pathname === item.path && !item.submenu;

  const handleClick = () => {
    if (item.submenu) {
      toggleDropdown(item.label);
    } else if (item.path) {
      router.push(item.path);
    }
  };

  const itemClasses = clsx(
    'flex items-center gap-2 cursor-pointer transition-all relative',
    {
      'hover:text-primary-600': true,
      'text-primary-600': isActive || isOpen,
      'text-base-300': !isActive && !isOpen,
      'bg-base-500': isActive && isCollapse,
      'justify-center mb-2 w-[45px] h-[45px] rounded-lg hover:bg-base-500':
        isCollapse,
      'justify-between py-2 px-6 h-11 w-full': !isCollapse,
    },
  );

  return (
    <div className="relative w-[90%] flex flex-col items-center">
      <li
        data-tooltip-id={`tooltip-${item.label}`}
        data-tooltip-content={item.label}
        className={itemClasses}
        onClick={handleClick}
      >
        {isActive && !isCollapse && (
          <span className="absolute top-0 left-0 w-1 h-full bg-primary-600" />
        )}

        <div className="flex items-center gap-1 justify-center">
          <Icon name={item.icon} className="text-xl" />
          {!isCollapse && (
            <span className="font-medium text-sm">{item.label}</span>
          )}
        </div>
      </li>

      {isCollapse && (
        <Tooltip
          id={`tooltip-${item.label}`}
          place="right"
          className="!bg-base-500 !rounded-lg text-white px-2 py-1"
          offset={30}
        />
      )}

      {item.submenu && (
        <SidebarSubmenu
          submenu={item.submenu}
          isOpen={isOpen}
          isCollapse={isCollapse}
        />
      )}
    </div>
  );
};

export default SidebarItem;
