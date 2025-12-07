'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Raffle } from '@riffy/types';
import { formatDate, formatCurrency } from '@riffy/utils';

import RaffleBox from './raffle-box/RaffleBox';

interface RaffleBoxesProps {
  raffle: Raffle;
  loading: boolean;
}

const RaffleBoxes = ({
  raffle,
  loading,
}: RaffleBoxesProps): ReactElement => {
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-3 gap-5 items-center w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-14 bg-box-secondary rounded-md animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 items-center w-full">
          <RaffleBox
            title="Por número"
            value={formatCurrency(raffle.price, 'VES')}
            loading={loading}
          />
          <RaffleBox
            title="Sorteo"
            value={formatDate(raffle.drawDate)}
            loading={loading}
          />
          {raffle.showDate && (
            <RaffleBox
              title="Disponibles"
              value={raffle.available}
              loading={loading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RaffleBoxes;
