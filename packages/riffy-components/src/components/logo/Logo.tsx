'use client';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { cn } from '@riffy/utils';

interface LogoProps {
  className: string;
  src: string;
  loading?: boolean;
  isRounded?: boolean;
}

const Logo = ({
  className,
  src,
  loading,
  isRounded,
}: LogoProps): ReactElement => {
  return (
    <Link href="/" className={className}>
      {loading || !src || src.trim() === '' ? (
        <div className="rounded-full w-[50px] h-[50px] bg-box-secondary animate-pulse" />
      ) : (
        <Image
          src={src}
          alt="logo"
          objectFit="contain"
          className={cn(className, isRounded && 'rounded-full')}
          width={117}
          height={30}
        />
      )}
    </Link>
  );
};

export default Logo;
