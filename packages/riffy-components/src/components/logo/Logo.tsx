'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: 'default' | 'white' | 'saturated';
}

const Logo = ({
  width = 117,
  height = 30,
  className,
  variant = 'default',
}: LogoProps): React.ReactElement => {
  const logoSrcMap: Record<NonNullable<LogoProps['variant']>, string> = {
    default: '/images/logo.svg',
    white: '/images/logo-white.svg',
    saturated: '/images/logo-saturated.svg',
  };

  const logoSrc = logoSrcMap[variant];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt="riffy Logo"
        width={width}
        height={height}
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
