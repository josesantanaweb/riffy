'use client';
import React from 'react';
import type { ReactElement } from 'react';

const Skeleton = (): ReactElement => {
  return (
    <div className="flex flex-col bg-base-700 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-[340px] relative bg-base-600" />
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2 border-b border-base-500 pb-4">
          <div className="h-8 bg-base-600 rounded-md w-[70%]" />
        </div>
        <div className="h-12 bg-base-600 rounded-xl w-[90%]" />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-base-600 rounded-md w-20" />
            <div className="h-4 bg-base-600 rounded-md w-16" />
          </div>
          <div className="w-full h-4 bg-base-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
