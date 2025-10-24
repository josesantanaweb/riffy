'use client';
import React from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';

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
  return (
    <div
      className={`w-full h-[340px] relative ${isCompleted ? 'saturate-0' : ''}`}
    >
      {loading ? (
        <div className="w-full h-full bg-box-secondary rounded-md animate-pulse" />
      ) : (
        <div className="w-full h-full overflow-hidden">
          <Image
            src={banner}
            alt="banner"
            width={500}
            height={500}
            className="object-cover w-full h-full hover:scale-105 transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default RaffleBanner;
