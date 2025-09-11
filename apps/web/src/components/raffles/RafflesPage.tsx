'use client';
import React from 'react';
import type { ReactElement } from 'react';
import RaffleCard from './raffle-card';

const RafflesPage = (): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col gap-5 py-5 px-5">
      <RaffleCard />
      <RaffleCard />
    </div>
  );
};

export default RafflesPage;
