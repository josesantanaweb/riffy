'use client';
import Link from 'next/link';
import React from 'react';

interface FooterItemProps {
  name: string;
  icon: string;
  isActive?: boolean;
  isMain?: boolean;
  isMenu?: boolean;
  onClick?: () => void;
}

const FooterItem = ({
  name,
  icon,
  isActive,
  isMain = false,
  isMenu = false,
  onClick,
}: FooterItemProps): React.ReactElement => {
  if (isMenu) {
    return (
      <button
        onClick={onClick}
        className={`w-16 flex flex-col items-center justify-center h-full gap-1 ${isActive ? 'text-white' : 'text-base-300'} hover:text-white transition-colors duration-200`}
      >
        <span
          className={`icon-${icon} text-xl flex items-center justify-center`}
        />
        <p className="text-xs capitalize">{name}</p>
      </button>
    );
  }

  if (isMain) {
    return (
      <Link
        href="/"
        className="flex h-full flex-col items-center justify-center text-white relative"
      >
        <div className="bg-primary-600 w-12 h-12 rounded-xl relative rotate-45 -top-4 flex items-center justify-center">
          <span className={`icon-${icon} text-xl -rotate-45 mr-1`} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`w-16 flex flex-col items-center justify-center h-full gap-1 ${isActive ? 'text-white' : 'text-base-300'} hover:text-white transition-colors duration-200`}
    >
      <span
        className={`icon-${icon} text-xl flex items-center justify-center`}
      />
      <p className="text-xs capitalize">{name}</p>
    </Link>
  );
};

export default FooterItem;
