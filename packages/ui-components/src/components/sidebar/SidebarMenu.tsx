'use client';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface SidebarMenuProps {
  submenu: { label: string; icon: string; path: string }[];
  isOpen: boolean;
  onClick?: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  submenu,
  isOpen,
  onClick,
}) => {
  return (
    <ul
      className={clsx(
        'w-full rounded-lg overflow-hidden transition-all duration-300 flex flex-col pl-3',
        isOpen ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0',
      )}
    >
      {submenu.map(subitem => (
        <Link
          href={subitem.path}
          key={subitem.label}
          data-tooltip-id={`tooltip-${subitem.label}`}
          data-tooltip-content={subitem.label}
          className={clsx(
            'flex items-center gap-3 text-base-300 hover:text-white p-3 cursor-pointer rounded-lg w-full',
          )}
          onClick={onClick}
        >
          <span className={`icon-${subitem.icon}`}></span>
          <span className="font-medium text-base">{subitem.label}</span>
        </Link>
      ))}
    </ul>
  );
};

export default SidebarMenu;
