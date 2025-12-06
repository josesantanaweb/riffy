'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Button } from '@riffy/components';

interface QuickButtonsProps {
  ticketsQuantity: number;
  setTicketsQuantity: (quantity: number) => void;
  minTickets?: number;
  maxTickets?: number;
}

const QuickButtons = ({
  ticketsQuantity,
  setTicketsQuantity,
  maxTickets,
}: QuickButtonsProps): ReactElement => {
  const quickButtons = [
    { label: '2 Tickets', value: 2 },
    { label: '5 Tickets', value: 5 },
    { label: '10 Tickets', value: 10 },
  ];

  return (
    <div className="flex items-center w-full justify-between">
      {quickButtons.map(({ label, value }) => (
        <Button
          key={value}
          variant={ticketsQuantity === value ? 'primary' : 'default'}
          size="lg"
          className="capitalize w-[30%]"
          onClick={() => setTicketsQuantity(value)}
          disabled={value > (maxTickets || 100)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default QuickButtons;
