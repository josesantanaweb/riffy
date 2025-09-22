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

const Alert = ({
  type,
  message,
  icon
}: AlertProps): ReactElement => {

  const TEXT_COLORS = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    default: 'text-white',
  } as const;

  const textColor = TEXT_COLORS[type || 'default'];

  return (
    <div
      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-base-600"
    >
      <Icon
        name={icon as IconName}
        className={`${textColor} text-xl`}
      />
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
};

export default Alert;
