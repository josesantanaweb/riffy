'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface TotalProps {
  totalTickets: number;
  price: number | null;
}

const Total = ({ totalTickets, price }: TotalProps): ReactElement => {
  const total = totalTickets * (price || 0);
  return (
    <div className="flex flex-col gap-2 border-t border-base-600 pt-4 mt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-base-300">Cantidad</p>
        <p className="text-sm font-medium text-white">{totalTickets || 0}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-base-300">Precio por ticket</p>
        <p className="text-sm font-medium text-white">
          Bs {price?.toFixed(2) || 0}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-base-300">Total a pagar</p>
        <p className="text-base font-medium text-white">
          Bs {isNaN(total) ? '0.00' : total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Total;
