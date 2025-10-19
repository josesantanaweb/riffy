import React from 'react';
import { cn } from '../../utils/cn';
import { getStatusStyles } from './utils';

export enum BadgeStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEFAULT = 'default',
}

interface BadgeProps {
  status: string;
  className?: string;
  label?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className, label }) => {
  const styles = getStatusStyles(status as BadgeStatus);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize',
        styles.text,
        styles.bg,
        className,
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
