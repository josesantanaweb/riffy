'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { useIsIPhone } from '@riffy/hooks';
import { useStore } from '@/store';

import BingoCard from '../common/bingo/bingo-card';
import BingosEmpty from '../common/bingo/bingos-empty';
import Skeleton from './Skeleton';

const BingosPage = (): ReactElement => {
  const { user, loading } = useStore();
  const isIPhone = useIsIPhone();

  return (
    <div
      className={`w-full h-full flex flex-col gap-5 ${isIPhone ? 'pb-24' : ''}`}
    >
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)}

      {!loading &&
        user?.bingos &&
        user.bingos.length > 0 &&
        user.bingos.map(bingo => (
          <BingoCard key={bingo.id} bingo={bingo} loading={loading} />
        ))}

      {!loading && user && (!user.bingos || user.bingos.length === 0) && (
        <BingosEmpty />
      )}
    </div>
  );
};

export default BingosPage;
