'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Ticket from '../ticket';
import { Ticket as ITicket } from '@riffy/types';
// import { Icon } from '@riffy/components';
import { Raffle } from '@riffy/types';

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


  return (
    <div className="relative h-[600px] overflow-visible">
      <motion.div
        className="relative h-full"
        animate={{ x: -currentIndex * 100 + '%' }}
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
              className="absolute w-full h-full"
              style={{
                left: `${index * 100}%`,
                zIndex: isCurrent ? 10 : isNext || isPrevious ? 5 : 1,
              }}
              initial={{ y: index * 40 }}
              animate={{
                scale: isCurrent ? 1 : isNext || isPrevious ? 0.95 : 0.9,
                y: isCurrent ? 0 : isNext || isPrevious ? 24 : 48,
                opacity: isCurrent ? 1 : isNext || isPrevious ? 0.7 : 0.5,
                filter: isCurrent ? 'none' : 'blur(1px)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="relative h-full"
                whileDrag={{ scale: 1.05 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                <Ticket ticket={ticket} raffle={raffle} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* {currentIndex > 0 && (
        <button
          className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-base-500/40 hover:bg-base-500 backdrop-blur-sm rounded-full p-2 w-10 h-10 flex items-center justify-center"
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          <Icon name="chevron-down" className="text-white text-3xl rotate-90" />
        </button>
      )} */}

      {/* {currentIndex < tickets.length - 1 && (
        <button
          className={`absolute -right-5 top-1/2 transform -translate-y-1/2 bg-base-500/60 hover:bg-base-500/80 backdrop-blur-sm rounded-full p-2 w-10 h-10 flex items-center justify-center ${
            currentIndex === 0 ? 'animate-bounce' : ''
          }`}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          <Icon name="chevron-down" className="text-white text-3xl -rotate-90" />
        </button>
      )} */}
    </div>
  );
};

export default Tickets;
