'use client';
import React from 'react';
import { Avatar } from '@riffy/components';
import type { ReactElement } from 'react';
import { User } from '@riffy/types';

interface NavUserProps {
  profile: User;
}

const NavUser = ({ profile }: NavUserProps): ReactElement => {
  return (
    <div className="flex items-center gap-3 cursor-pointer ml-2">
      <Avatar name={profile?.name} src={profile?.logo} size={35} />
      <div className="flex flex-col">
        <span className="dark:text-white text-primary text-sm font-medium capitalize">{profile?.name}</span>
        <span className="text-base-300 text-[10px] font-medium">{profile?.role}</span>
      </div>
    </div>
  );
};

export default NavUser;
