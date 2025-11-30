'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { formatCurrency } from '@riffy/utils';

interface BingoTitleProps {
  title: string;
  award: number;
  loading: boolean;
}

const BingoTitle = ({
  title,
  award,
  loading,
}: BingoTitleProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2 border-b border-line-100 pb-4">
      {loading ? (
        <div className="w-[90%] h-[20px] bg-box-secondary rounded-md animate-pulse" />
      ) : (
        <div className="flex items-start gap-2 flex-col">
          <h1 className="text-2xl font-bold text-title line-clamp-2">
            {title}
          </h1>
          <p className="text-primary-500 text-base font-semibold">
            <span className="text-body-100 mr-2">Premio:</span>
            {formatCurrency(award, 'VES')}
          </p>
        </div>
      )}
    </div>
  );
};

export default BingoTitle;
