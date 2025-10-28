'use client';
import React from 'react';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';
import { SubmenuItem } from './types';
interface SidebarSubmenuProps {
  submenu: SubmenuItem[];
  isOpen: boolean;
  isCollapse: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  submenu,
  isOpen,
  isCollapse,
}) => {
  const submenuClasses = clsx(
    'w-full rounded-lg overflow-hidden transition-all duration-300 flex flex-col',
    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 my-0',
    isCollapse ? 'items-center' : 'bg-box-secondary',
  );

  return (
    <ul className={submenuClasses}>
      {submenu.map(({ label, icon }) => {
        const tooltipId = `tooltip-${label}`;

        return (
          <li
            key={label}
            data-tooltip-id={tooltipId}
            data-tooltip-content={label}
            className={clsx(
              'flex items-center gap-3 text-body-100 hover:text-white cursor-pointer rounded-lg',
              isCollapse
                ? 'justify-center mb-2 bg-box-secondary w-[45px] h-[45px]'
                : 'p-3',
            )}
          >
            {icon}

            {!isCollapse && (
              <span className="font-medium text-base">{label}</span>
            )}

            {isCollapse && (
              <Tooltip
                id={tooltipId}
                place="right"
                className="bg-box-secondary! rounded-lg! text-white px-2 py-1"
                offset={10}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarSubmenu;
