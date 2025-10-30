'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { useStore } from '@/store';
import { useIsIPhone } from '@/hooks';
import RaffleCard from '../common/raffle/raffle-card';
import Skeleton from './skeleton';
import RafflesEmpty from '../common/raffle/raffles-empty';

const RafflesPage = (): ReactElement => {
  const { user, loading } = useStore();
  const isIPhone = useIsIPhone();

  return (
    <div
      className={`w-full h-full flex flex-col gap-5 py-5 px-5 ${isIPhone ? 'pb-24' : ''}`}
    >
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)}

      {!loading &&
        user?.raffles &&
        user.raffles.length > 0 &&
        user.raffles.map(raffle => (
          <RaffleCard key={raffle.id} raffle={raffle} loading={loading} />
        ))}

      {!loading && user && (!user.raffles || user.raffles.length === 0) && (
        <RafflesEmpty />
      )}
    </div>
  );
};

export default RafflesPage;
