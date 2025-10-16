'use client';
import React from 'react';
import { Icon, IconName } from '@riffy/components';
import type { ReactElement } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'default';

interface AlertProps {
  type?: AlertType;
  message?: string;
  icon?: string;
}

const Alert = ({ type, message, icon }: AlertProps): ReactElement => {
  const TEXT_COLORS = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    default: 'dark:text-white text-base-300',
  } as const;

  const BACKGROUND_COLORS = {
    success: 'bg-success-500/10',
    error: 'bg-error-500/10',
    warning: 'bg-warning-500/10',
    default: 'dark:bg-base-600 bg-base-700',
  } as const;

  const textColor = TEXT_COLORS[type || 'default'];

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-xl ${BACKGROUND_COLORS[type || 'default']}`}
    >
      <Icon name={icon as IconName} className={`${textColor} text-xl`} />
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
};

export default Alert;
