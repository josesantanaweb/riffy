'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { cn } from '@riffy/utils';

interface RaffleMainProps {
  title: string;
  description?: string;
  loading: boolean;
}

const RaffleMain = ({
  title,
  description,
  loading,
}: RaffleMainProps): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex flex-col gap-2 border-b border-line-100 pb-4">
      {loading ? (
        <div className="w-[90%] h-[20px] bg-box-secondary rounded-md animate-pulse" />
      ) : (
        <h1
          className="text-2xl font-bold text-title line-clamp-2"
          onClick={toggleExpanded}
        >
          {title}
        </h1>
      )}
      {description && (
        <div className="flex flex-col">
          <div
            onClick={toggleExpanded}
            className={cn(
              'text-body-100 text-base overflow-hidden transition-[max-height] duration-500 ease-in-out',
              isExpanded ? 'max-h-[2000px]' : 'max-h-6',
            )}
          >
            <div
              className={cn(
                'transition-opacity duration-300 ease-in-out',
                isExpanded ? 'opacity-100' : 'opacity-90 line-clamp-1',
              )}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RaffleMain;
