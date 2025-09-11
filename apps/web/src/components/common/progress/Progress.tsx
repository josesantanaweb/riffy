'use client';
import React from 'react';
import type { ReactElement } from 'react';

const Progress = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-primary-500 text-medium">50% Completado</p>
        <p className="text-sm text-success-500 text-medium">5.000/10.000</p>
      </div>
      <div className="w-full h-[15px] bg-base-600 rounded-full">
        <div className="w-1/2 h-full bg-primary-500 rounded-full" />
      </div>
    </div>
  );
};

export default Progress;
