'use client';
import React from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';

interface LogoProps {
  className: string;
  src: string;
  loading?: boolean;
}

const Logo = ({ className, src, loading }: LogoProps): ReactElement => {
  return (
    <div className={className}>
      {loading ? (
        <div className="w-[117px] h-[30px] bg-base-600 rounded-md animate-pulse" />
      ) : (
        <Image
          src={src}
          alt="logo"
          objectFit="contain"
          className={className}
          width={117}
          height={30}
        />
      )}
    </div>
  );
};

export default Logo;
