'use client';
import React from 'react';
import type { ReactElement } from 'react';

const Skeleton = (): ReactElement => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 100 }, (_, i) => (
        <span
          key={i}
          className="text-sm bg-box-secondary rounded-md p-2 h-10 flex items-center justify-center animate-pulse"
        />
      ))}
    </div>
  );
};

export default Skeleton;
