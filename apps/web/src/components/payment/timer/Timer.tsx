'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { formatTime } from '@/utils';

const TIMER_KEY = 'payment-timer';
const TIMER_DURATION = 5 * 60;

const Timer = (): ReactElement => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  const loadTimerFromStorage = (): number => {
    if (typeof window === 'undefined') return TIMER_DURATION;

    try {
      const savedTimer = localStorage.getItem(TIMER_KEY);
      if (savedTimer) {
        const { timeLeft: savedTime, timestamp } = JSON.parse(savedTimer);
        const elapsed = Math.floor((Date.now() - timestamp) / 1000);
        const remainingTime = savedTime - elapsed;

        if (remainingTime > 0) {
          return remainingTime;
        }
      }
    } catch {
      //
    }

    return TIMER_DURATION;
  };

  const saveTimerToStorage = (time: number) => {
    if (typeof window === 'undefined') return;

    try {
      const timerData = {
        timeLeft: time,
        timestamp: Date.now()
      };
      localStorage.setItem(TIMER_KEY, JSON.stringify(timerData));
    } catch {
      //
    }
  };

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
          localStorage.removeItem(TIMER_KEY);
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

export default Timer;
