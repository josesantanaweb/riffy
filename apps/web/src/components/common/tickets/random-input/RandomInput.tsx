'use client';
import React from 'react';
import type { ReactElement } from 'react';

import NumberInput from '@/components/common/number-input';
import QuickButtons from './quick-buttons';

interface RandomInputProps {
  ticketsQuantity: number;
  setTicketsQuantity: (quantity: number) => void;
  minTickets?: number;
  maxTickets?: number;
}

const RandomInput = ({
  ticketsQuantity,
  setTicketsQuantity,
  minTickets,
  maxTickets,
}: RandomInputProps): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <QuickButtons
        ticketsQuantity={ticketsQuantity}
        setTicketsQuantity={setTicketsQuantity}
        maxTickets={maxTickets}
      />

      <NumberInput
        value={ticketsQuantity}
        setValue={setTicketsQuantity}
        minValue={minTickets}
        maxValue={maxTickets}
      />
    </div>
  );
};

export default RandomInput;
