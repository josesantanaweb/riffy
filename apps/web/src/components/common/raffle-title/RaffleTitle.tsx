'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface RaffleTitleProps {
  title: string;
  loading: boolean;
}

const RaffleTitle = ({ title, loading }: RaffleTitleProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2 border-b border-base-500 pb-4">
      {loading ? (
        <div className="w-[90%] h-[20px] bg-base-600 rounded-md animate-pulse" />
      ) : (
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      )}
    </div>
  );
};

export default RaffleTitle;
