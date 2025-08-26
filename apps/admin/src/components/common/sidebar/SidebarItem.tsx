'use client';
import React from 'react';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';

import SidebarSubmenu from './SidebarSubmenu';

interface Item {
  label: string;
  icon: any;
  submenu?: { label: string; icon: any }[];
}

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
  return (
    <div className="relative w-[90%] flex flex-col items-center">
      <li
        data-tooltip-id={`tooltip-${item.label}`}
        data-tooltip-content={item.label}
        className={clsx(
          'flex items-center rounded-lg gap-2 hover:text-white cursor-pointer transition-all',
          isOpen && 'bg-primary-600 text-white',
          !isOpen && 'text-base-300',
          isCollapse
            ? 'justify-center mb-2 w-[45px] h-[45px] rounded-lg bg-base-500'
            : 'justify-between p-3 w-full',
        )}
        onClick={() => toggleDropdown(item.label)}
      >
        <div className={clsx('flex items-center gap-3 justify-center')}>
          {/* <FontAwesomeIcon icon={item.icon} fontSize={18} width={18} /> */}
          {!isCollapse && (
            <span className="font-medium text-base-300">{item.label}</span>
          )}
        </div>
        {/* {!isCollapse && item.submenu && (
          <FontAwesomeIcon
            icon={faChevronDown}
            fontSize={14}
            width={14}
            className={clsx(
              'transform transition-transform duration-300 rounded-lg p-2',
              isOpen
                ? 'rotate-180 hover:bg-primary-600'
                : 'rotate-0 hover:bg-base-500',
            )}
          />
        )} */}
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
