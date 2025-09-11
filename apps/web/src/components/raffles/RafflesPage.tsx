'use client';
import React from 'react';
import type { ReactElement } from 'react';
import RaffleCard from './raffle-card';
import Skeleton from './skeleton';
import { useStore } from '@/store';

const RafflesPage = (): ReactElement => {
  const { user, loading } = useStore();

  return (
    <div className="w-full h-full flex flex-col gap-5 py-5 px-5">
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)}
      {!loading && user?.raffles?.map(raffle => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
};

export default RafflesPage;
