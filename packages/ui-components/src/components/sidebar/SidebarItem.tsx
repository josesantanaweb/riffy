'use client';
import React from 'react';
import Link from 'next/link';
import SidebarMenu from './SidebarMenu';

interface Item {
  label: string;
  icon: string;
  path: string;
  submenu?: { label: string; icon: string; path: string }[];
}

interface SidebarItemProps {
  item: Item;
  isOpen: boolean;
  toggleMenu: (label: string) => void;
  onClose?: () => void;
}

const SidebarItem = ({
  item,
  isOpen,
  toggleMenu,
  onClose,
}: SidebarItemProps): React.ReactElement => {
  const { label, icon, submenu, path } = item;

  const handleMenu = () => toggleMenu(item.label);

  const handleLink = () => {
    if (onClose) onClose();
  };

  const content = (
    <>
      <div className="flex items-center gap-2">
        <span className={`icon-${icon} text-xl`} />
        <p className="text-base font-semibold">{label}</p>
      </div>
      {submenu && <span className={`icon-chevron-down text-xl`} />}
    </>
  );

  return (
    <div className="flex flex-col py-3 px-2 rounded-lg text-base-300 w-full cursor-pointer transition-all">
      {submenu ? (
        <div className="flex items-center justify-between" onClick={handleMenu}>
          {content}
        </div>
      ) : (
        <Link
          href={path}
          className="flex items-center justify-between"
          onClick={handleLink}
        >
          {content}
        </Link>
      )}

      {submenu && (
        <SidebarMenu submenu={submenu} isOpen={isOpen} onClick={onClose} />
      )}
    </div>
  );
};

export default SidebarItem;
