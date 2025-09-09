'use client';
import React from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';

interface LogoProps {
  className: string;
  src: string;
}

const Logo = ({ className, src }: LogoProps): ReactElement => {
  return (
    <div className={className}>
      <Image
        src={src}
        alt="logo"
        objectFit="contain"
        className={className}
        width={117}
        height={30}
      />
    </div>
  );
};

export default Logo;
