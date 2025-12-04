'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { formatCurrency } from '@riffy/utils';

interface PaymentTotalProps {
  totalTickets: number;
  price: number | null;
}

const PaymentTotal = ({ totalTickets, price }: PaymentTotalProps): ReactElement => {
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
          {formatCurrency(price || 0, 'VES')}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-body-100">Total a pagar</p>
        <p className="text-base font-medium text-title">
          {formatCurrency(total, 'VES')}
        </p>
      </div>
    </div>
  );
};

export default PaymentTotal;
