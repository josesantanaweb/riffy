'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import {
  loadTimerFromStorage,
  saveTimerToStorage,
  removeTimerFromStorage,
  getTimerDuration,
} from '@/utils';
import { ROUTES } from '@/constants';
import { Icon } from '@riffy/components';
import { formatTime } from '@riffy/utils';

const PaymentTimer = (): ReactElement => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(getTimerDuration());

  useEffect(() => {
    const savedTime = loadTimerFromStorage();
    setTimeLeft(savedTime);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;

        saveTimerToStorage(newTime);

        if (newTime <= 0) {
          removeTimerFromStorage();
          router.push(ROUTES.RAFFLES.LIST);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex items-center gap-2 text-danger-500">
      <Icon name="time" className="text-lg" />
      <p className="text-base">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default PaymentTimer;
