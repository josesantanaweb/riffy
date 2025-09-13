'use client';
import React from 'react';
import type { ReactElement } from 'react';

const Skeleton = (): ReactElement => {

  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-base-600 rounded-md w-20" />
        <div className="h-4 bg-base-600 rounded-md w-16" />
      </div>
      <div className="w-full h-4 bg-base-600 rounded-full" />
    </div>
  );
};

export default Skeleton;
