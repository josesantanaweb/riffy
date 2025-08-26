'use client';
import React from 'react';
import { Avatar } from '@riffy/components';
import type { ReactElement } from 'react';

interface NavUserProps {
  name: string;
  role: string;
}

const NavUser = ({ name, role }: NavUserProps): ReactElement => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <Avatar name={name} size={35} />
      <div className="flex flex-col">
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-base-300 text-xs font-medium">{role}</span>
      </div>
    </div>
  );
};

export default NavUser;
