'use client';
import type { ReactElement } from 'react';
import { cn } from '@riffy/utils';

export type IconName =
  | 'credit-card'
  | 'menu'
  | 'chevron-down'
  | 'info-circle'
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
  | 'search'
  | 'image'
  | 'calendar'
  | 'arrow-back'
  | 'plus-circle'
  | 'close'
  | 'whatsapp'
  | 'instagram'
  | 'tiktok'
  | 'check-circle'
  | 'dollar'
  | 'sort'
  | 'shuffle'
  | 'list'
  | 'copy'
  | 'time'
  | 'logout'
  | 'spinner'
  | 'check-circle'
  | 'file'
  | 'sun'
  | 'moon'
  | 'settings'
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
