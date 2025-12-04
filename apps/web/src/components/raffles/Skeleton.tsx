'use client';
import React from 'react';
import type { ReactElement } from 'react';

const Skeleton = (): ReactElement => {
  return (
    <div className="flex flex-col bg-box-primary rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-[340px] relative bg-box-secondary" />
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2 border-b border-line-100 pb-4">
          <div className="h-8 bg-box-secondary rounded-md w-[70%]" />
        </div>
        <div className="grid grid-cols-3 gap-5 items-center w-full">
          <div className="w-full h-14 bg-box-secondary rounded-md animate-pulse" />
          <div className="w-full h-14 bg-box-secondary rounded-md animate-pulse" />
          <div className="w-full h-14 bg-box-secondary rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-box-secondary rounded-md w-20" />
            <div className="h-4 bg-box-secondary rounded-md w-16" />
          </div>
          <div className="w-full h-4 bg-box-secondary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
