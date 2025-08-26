'use client';
import React from 'react';
import type { ReactElement } from 'react';

type IconName =
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
  | 'confetti';

interface IconProps {
  className?: string;
  name: IconName;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const Icon = ({ className, name, onClick, size = "large" }: IconProps): ReactElement => {

  const sizeClass = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm';
  return <span className={`icon-${name} ${className} cursor-pointer ${sizeClass}`} onClick={onClick} />;
};

export default Icon;
