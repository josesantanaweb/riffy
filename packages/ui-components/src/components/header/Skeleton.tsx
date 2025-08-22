'use client';
import React from 'react';

const Skeleton = (): React.ReactElement => {
  return (
    <div className="flex gap-2">
      <div className="rounded-lg border-2 w-[200px] h-[40px] border-base-500 flex items-center justify-between p-1 animate-pulse">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 bg-base-500 rounded-full" />
          <div className="w-16 h-4 bg-base-500 rounded" />
        </div>
      </div>
      <div className="cursor-pointer">
        <div className="bg-base-500 rounded-full animate-pulse w-9 h-9" />
      </div>
    </div>
  );
};

export default Skeleton;
