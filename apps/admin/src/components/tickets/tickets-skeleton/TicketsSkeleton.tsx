'use client';
import React from 'react';

const TicketsSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse grid grid-cols-10 gap-2">
      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-12 bg-box-secondary rounded-md"
        />
      ))}
    </div>
  );
};

export default TicketsSkeleton;
