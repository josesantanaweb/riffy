'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface BingoTitleProps {
  title: string;
  loading: boolean;
}

const BingoTitle = ({ title, loading }: BingoTitleProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2 border-b border-line-100 pb-4">
      {loading ? (
        <div className="w-[90%] h-[20px] bg-box-secondary rounded-md animate-pulse" />
      ) : (
        <h1 className="text-2xl font-bold text-title line-clamp-2">{title}</h1>
      )}
    </div>
  );
};

export default BingoTitle;
