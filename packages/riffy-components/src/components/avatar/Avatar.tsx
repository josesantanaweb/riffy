'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@riffy/utils';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  className?: string;
  isLoading?: boolean;
}

const Avatar = ({
  src,
  name = '',
  size = 40,
  className,
  isLoading,
}: AvatarProps): React.ReactElement => {
  const customClass = cn('h-full w-full bg-box-primary', className);
  const showImage = src && src.trim() !== '';
  const safeName = typeof name === 'string' ? name : '';
  const trimmed = safeName.trim();
  const initial = trimmed.length > 0 ? trimmed.charAt(0).toUpperCase() : '';

  if (isLoading) {
    return (
      <div
        className={cn('bg-base-500 rounded-full animate-pulse', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden"
    >
      {showImage ? (
        <Image
          src={src!}
          alt={name || 'user'}
          className={customClass}
          width={size}
          height={size}
        />
      ) : (
        <div
          className={cn(
            'bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-lg',
          )}
          style={{ width: size, height: size }}
        >
          {initial}
        </div>
      )}
    </div>
  );
};

export default Avatar;
