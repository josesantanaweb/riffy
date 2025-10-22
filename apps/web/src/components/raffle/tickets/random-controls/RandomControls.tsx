'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Button, Icon } from '@riffy/components';

interface RandomControlsProps {
  ticketsQuantity: number;
  setTicketsQuantity: (quantity: number) => void;
  minTickets?: number;
  maxTickets?: number;
}

const RandomControls = ({
  ticketsQuantity,
  setTicketsQuantity,
  minTickets,
  maxTickets,
}: RandomControlsProps): ReactElement => {
  const increment = () => {
    setTicketsQuantity(Math.min(ticketsQuantity + 1, maxTickets || 100));
  };

  const decrement = () => {
    setTicketsQuantity(Math.max(ticketsQuantity - 1, minTickets || 1));
  };

  const quickButtons = [
    { label: '2 Tickets', value: 2 },
    { label: '5 Tickets', value: 5 },
    { label: '10 Tickets', value: 10 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center w-full justify-between">
        {quickButtons.map(({ label, value }) => (
          <Button
            key={value}
            variant={ticketsQuantity === value ? 'primary' : 'default'}
            size="lg"
            className="capitalize"
            onClick={() => setTicketsQuantity(value)}
            disabled={value > (maxTickets || 100)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="default"
          size="lg"
          className="w-12 h-12"
          onClick={decrement}
          disabled={ticketsQuantity <= (minTickets || 1)}
        >
          <Icon name="minus" className="text-2xl" />
        </Button>
        <div className="text-white text-lg bg-base-600 rounded-md w-full h-12 flex items-center justify-center">
          {ticketsQuantity}
        </div>
        <Button
          variant="default"
          size="lg"
          className="w-12 h-12"
          onClick={increment}
          disabled={ticketsQuantity >= (maxTickets || 100)}
        >
          <Icon name="plus" className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default RandomControls;
