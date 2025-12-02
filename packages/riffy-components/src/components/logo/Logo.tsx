'use client';
import React from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Link from 'next/link';

interface LogoProps {
  className: string;
  src: string;
  loading?: boolean;
}

const Logo = ({ className, src, loading }: LogoProps): ReactElement => {
  return (
    <Link href="/" className={className}>
      {loading || !src || src.trim() === '' ? (
        <div className="w-[60px] h-[60px] bg-box-secondary rounded-full animate-pulse" />
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
    </Link>
  );
};

export default Logo;
