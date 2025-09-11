'use client';
import React from 'react';
import type { ReactElement } from 'react';
import RaffleCard from './raffle-card';
import { useRafflesByDomain } from '@riffy/hooks';
import Skeleton from './skeleton';

const RafflesPage = (): ReactElement => {
  const { data: raffles, loading } = useRafflesByDomain();

  return (
    <div className="w-full h-full flex flex-col gap-5 py-5 px-5">
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)}
      {!loading &&
        raffles?.map(raffle => <RaffleCard key={raffle.id} raffle={raffle} />)}
    </div>
  );
};

export default RafflesPage;
