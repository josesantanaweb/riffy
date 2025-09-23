'use client';
import React, { useState, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import Ticket from '../ticket';
import { Ticket as ITicket } from '@riffy/types';
import { Icon } from '@riffy/components';
import { Raffle } from '@riffy/types';

interface TicketsProps {
  tickets: ITicket[];
  raffle: Raffle;
}

const Tickets = ({ tickets, raffle }: TicketsProps): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      setStartX(e.touches[0].clientX);
      setIsDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDragging) return;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentIndex < tickets.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      }

      setIsDragging(false);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, isDragging, startX, tickets.length]);


  return (
    <div
      className="relative h-[600px] overflow-visible"
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      <div
        ref={containerRef}
        className="relative h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        {tickets.map((ticket, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === currentIndex + 1;
          const isPrevious = index === currentIndex - 1;

          return (
            <div
              key={ticket.id}
              className="absolute w-full h-full"
              style={{
                left: `${index * 100}%`,
                zIndex: isCurrent ? 10 : isNext || isPrevious ? 5 : 1,
              }}
            >
              <div
                className={`relative transition-all duration-300 ${
                  isCurrent
                    ? 'scale-100 translate-y-0 shadow-2xl'
                    : isNext
                      ? 'scale-95 translate-y-6 opacity-70 shadow-lg'
                      : isPrevious
                        ? 'scale-95 translate-y-6 opacity-70 shadow-lg'
                        : 'scale-90 translate-y-12 opacity-50 shadow-md'
                }`}
                style={{
                  transform: isCurrent
                    ? 'scale(1) translateY(0)'
                    : isNext
                      ? 'scale(0.95) translateY(24px)'
                      : isPrevious
                        ? 'scale(0.95) translateY(24px)'
                        : 'scale(0.9) translateY(48px)',
                  filter: isCurrent ? 'none' : 'blur(1px)',
                }}
              >
                <Ticket ticket={ticket} raffle={raffle} />
              </div>
            </div>
          );
        })}
      </div>

      {currentIndex > 0 && (
        <button
          className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-base-500/40 hover:bg-base-500 backdrop-blur-sm rounded-full p-2 w-10 h-10 flex items-center justify-center"
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          <Icon name="chevron-down" className="text-white text-3xl rotate-90" />
        </button>
      )}

      {currentIndex < tickets.length - 1 && (
        <button
          className={`absolute -right-5 top-1/2 transform -translate-y-1/2 bg-base-500/60 hover:bg-base-500/80 backdrop-blur-sm rounded-full p-2 w-10 h-10 flex items-center justify-center ${
            currentIndex === 0 ? 'animate-bounce' : ''
          }`}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          <Icon name="chevron-down" className="text-white text-3xl -rotate-90" />
        </button>
      )}
    </div>
  );
};

export default Tickets;
