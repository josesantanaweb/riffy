'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { formatTime } from '@/utils';

const Timer = (): ReactElement => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          router.push(ROUTES.RAFFLES.LIST);
          return 0;
        }
        return prevTime - 1;
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
