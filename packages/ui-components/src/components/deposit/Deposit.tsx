'use client';
import React from 'react';
import type { ReactElement } from 'react';
import ButtonIcon from '../button-icon';

interface DepositProps {
  balance: number;
}

const Deposit = ({ balance }: DepositProps): ReactElement => {
  return (
    <div className="rounded-lg border w-[180px] h-[px] border-base-500 flex items-center justify-between p-0.5">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 bg-base-700 ml-0.5 rounded-full font-semibold text-xs text-white flex justify-center items-center">
          V
        </span>
        <div className="flex items-center gap-2 text-white">
          <h4 className="uppercase text-sm font-semibold">
            {balance || 0} VES
          </h4>
          <button
            className="cursor-pointer"
            aria-label="Abrir menú"
            type="button"
          >
            <span className="icon-chevron-down" />
          </button>
        </div>
      </div>
      <ButtonIcon
        onClick={() => ({})}
        size="md"
        variant="primary"
        aria-label="Agregar depósito"
      >
        <span className="icon-plus" />
      </ButtonIcon>
    </div>
  );
};

export default Deposit;
