'use client';
import type { ReactElement } from 'react';
import React from 'react';
import clsx from 'clsx';
import { Icon } from '@riffy/components';

interface NumberProps {
  number: number;
  onClick: () => void;
}

const Number = ({ number, onClick }: NumberProps): ReactElement => {
  const renderMark = () => (
    <div className="bg-primary-500 rounded-lg p-1 h-8 w-8 flex items-center justify-center">
      <Icon name="star" className="text-white" />
    </div>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx('number', {
        'bg-transparent': number === -1,
        'bg-box-secondary hover:bg-primary-500 border w-8 text-sm h-8 border-line-100 rounded-md text-body-100 hover:text-white font-bold focus:bg-primary-500 focus:text-white':
          number !== -1,
      })}
    >
      {number === -1 ? renderMark() : number}
    </button>
  );
};

export default Number;
