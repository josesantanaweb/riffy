'use client';
import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src: string;
  size?: number;
  className?: string;
  isLoading?: boolean;
}

const Avatar = ({
  src,
  size = 100,
  className,
  isLoading,
}: AvatarProps): React.ReactElement => {
  const customClass = cn('rounded-full object-cover', className);
  const validSrc = src && src.trim() !== '' ? src : '/users/default-image.png';

  if (isLoading) {
    return (
      <div
        className={cn('bg-base-500 rounded-full animate-pulse')}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={validSrc}
      alt="user"
      className={customClass}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
