'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { cn } from '@/utils/cn';

export type IconName =
  | 'credit-card'
  | 'menu'
  | 'chevron-down'
  | 'info-circle.svg'
  | 'hide'
  | 'show'
  | 'minus'
  | 'plus'
  | 'bell'
  | 'gift'
  | 'home'
  | 'user'
  | 'ticket'
  | 'confetti'
  | 'edit'
  | 'trash'
  | 'download'
  | 'seach'
  | 'dots';

interface IconProps {
  className?: string;
  name: IconName;
  onClick?: () => void;
}

const Icon = ({ className, name, onClick }: IconProps): ReactElement => {
  const iconClass = cn(`icon-${name}`, 'cursor-pointer text-lg', className);
  return <span className={iconClass} onClick={onClick} />;
};

export default Icon;
