'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface RaffleBoxProps {
  title: string;
  value: string | number;
  loading: boolean;
}

const RaffleBox = ({ title, value }: RaffleBoxProps): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center bg-box-secondary rounded-lg p-2">
      <p className="text-base text-title font-bold">{value}</p>
      <h4 className="text-xs text-body-100">{title}</h4>
    </div>
  );
};

export default RaffleBox;
