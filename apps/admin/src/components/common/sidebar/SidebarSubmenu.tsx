'use client';
import React from 'react';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';

interface SidebarSubmenuProps {
  submenu: { label: string; icon: any }[];
  isOpen: boolean;
  isCollapse: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  submenu,
  isOpen,
  isCollapse,
}) => {
  return (
    <ul
      className={clsx(
        'w-full rounded-lg overflow-hidden transition-all duration-300 flex flex-col',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 my-0',
        isCollapse ? 'items-center ' : 'bg-base-500',
      )}
    >
      {submenu.map(subitem => (
        <li
          key={subitem.label}
          data-tooltip-id={`tooltip-${subitem.label}`}
          data-tooltip-content={subitem.label}
          className={clsx(
            'flex items-center gap-3 text-base-300 hover:text-white p-3 cursor-pointer rounded-lg',
            isCollapse
              ? 'justify-center mb-2 bg-base-500 w-[45px] h-[45px]'
              : 'p-3',
          )}
        >
          {!isCollapse && (
            <span className="font-medium text-base">{subitem.label}</span>
          )}

          <Tooltip
            id={`tooltip-${subitem.label}`}
            place="right"
            className="!bg-base-500 !rounded-lg text-white px-2 py-1"
            offset={10}
          />
        </li>
      ))}
    </ul>
  );
};

export default SidebarSubmenu;
