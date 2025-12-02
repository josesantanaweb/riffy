'use client';
import type { ReactElement } from 'react';
import React from 'react';
import clsx from 'clsx';
import { Icon } from '@riffy/components';

interface NumberProps {
  number: number;
  onClick: () => void;
  disabled?: boolean;
}

const Number = ({ number, onClick, disabled = false }: NumberProps): ReactElement => {
  const renderMark = () => (
    <div className="bg-primary-500 rounded-lg p-1 h-8 w-8 flex items-center justify-center shrink-0">
      <Icon name="star" className="text-white" />
    </div>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || number === -1}
      className={clsx('shrink-0 flex items-center justify-center w-8 h-8', {
        'bg-transparent': number === -1,
        'bg-box-secondary hover:bg-primary-500 border text-sm border-line-100 rounded-md text-body-100 hover:text-white font-bold focus:bg-primary-500 focus:text-white':
          number !== -1 && !disabled,
        'bg-box-secondary border text-sm border-line-100 rounded-md text-body-100 opacity-50 cursor-not-allowed':
          number !== -1 && disabled,
      })}
    >
      {number === -1 ? renderMark() : number}
    </button>
  );
};

export default Number;
