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

      {!loading && user?.raffles && user.raffles.length > 0 &&
        user.raffles.map(raffle => (
          <RaffleCard key={raffle.id} raffle={raffle} loading={loading} />
        ))}

      {!loading && user && (!user.raffles || user.raffles.length === 0) && (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-base-300 text-center">No hay rifas disponibles</p>
        </div>
      )}
    </div>
  );
};

export default RafflesPage;
