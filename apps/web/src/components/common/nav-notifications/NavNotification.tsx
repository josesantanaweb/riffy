'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';

const NavNotification = (): ReactElement => {
  return (
    <div className="relative">
      <Icon name="bell" className="text-base-300" />
      <span className="w-4 h-4 rounded-full flex items-center justify-center text-white bg-primary-500 text-[10px] absolute -top-1 -right-1">
        2
      </span>
    </div>
  );
};

export default NavNotification;
