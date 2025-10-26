'use client';
import React from 'react';
import type { ReactElement } from 'react';
import Image from 'next/image';

import { cn } from '@/utils';

interface RaffleBannerProps {
  banner: string;
  isCompleted: boolean;
  loading: boolean;
}

const RaffleBanner = ({
  banner,
  isCompleted,
  loading,
}: RaffleBannerProps): ReactElement => {

  const bannerClasses = cn(
    'w-full h-[340px] relative',
    {
      'saturate-0': isCompleted,
      'cursor-pointer': !loading && !isCompleted,
    },
  );

  return (
    <div
      className={bannerClasses}
    >
      {loading ? (
        <div className="w-full h-full bg-box-secondary rounded-md animate-pulse" />
      ) : (
        <div className="w-full h-full overflow-hidden">
          <Image
            src={banner}
            alt="banner"
            width={500}
            role="img"
            height={500}
            className="object-cover w-full h-full hover:scale-105 transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default RaffleBanner;
