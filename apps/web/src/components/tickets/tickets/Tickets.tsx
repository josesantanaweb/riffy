'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Ticket as ITicket } from '@riffy/types';
import { Raffle } from '@riffy/types';
import Ticket from '../ticket';

interface TicketsProps {
  tickets: ITicket[];
  raffle: Raffle;
}

const Tickets = ({ tickets, raffle }: TicketsProps): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < tickets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };


  const CARD_WIDTH = 95;
  const CARD_OFFSET = 90;

  return (
    <div className="relative h-[600px] overflow-visible">
      <motion.div
        className="relative h-full flex items-center"
        animate={{ x: `calc(-${currentIndex * CARD_OFFSET}% + (100% - ${CARD_WIDTH}%) / 2)` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ touchAction: 'pan-y' }}
      >
        {tickets.map((ticket, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === currentIndex + 1;
          const isPrevious = index === currentIndex - 1;

          return (
            <motion.div
              key={ticket.id}
              className="absolute h-full flex items-center justify-center px-2"
              style={{
                left: `${index * CARD_OFFSET}%`,
                width: `${CARD_WIDTH}%`,
                zIndex: isCurrent ? 10 : isNext || isPrevious ? 5 : 1,
              }}
              initial={{ y: index * 40 }}
              animate={{
                scale: isCurrent ? 1 : isNext || isPrevious ? 0.9 : 0.8,
                y: isCurrent ? 0 : isNext || isPrevious ? 20 : 40,
                opacity: isCurrent ? 1 : isNext || isPrevious ? 0.6 : 0.4,
                filter: isCurrent ? 'none' : 'blur(2px)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="relative h-full w-full"
                whileDrag={{ scale: 1.05 }}
              >
                <Ticket ticket={ticket} raffle={raffle} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Tickets;
