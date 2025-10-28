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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-body-100">Cantidad</p>
        <p className="text-sm font-medium text-title">{totalTickets || 0}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-body-100">Precio por ticket</p>
        <p className="text-sm font-medium text-title">
          Bs {price?.toFixed(2) || 0}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-body-100">Total a pagar</p>
        <p className="text-base font-medium text-title">
          Bs {isNaN(total) ? '0.00' : total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Total;
