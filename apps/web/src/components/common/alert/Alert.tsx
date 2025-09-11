'use client';
import React from 'react';
import { Icon, IconName } from '@riffy/components';
import type { ReactElement } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

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

  const ALERT_STYLES = {
    success: 'bg-gradient-to-r from-success-500/10 to-transparent',
    error: 'bg-gradient-to-r from-error-500/10 to-transparent',
    warning: 'bg-gradient-to-r from-warning-500/10 to-transparent',
    info: 'bg-gradient-to-r from-primary-500/10 to-transparent',
  } as const;

  const TEXT_COLORS = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-primary-500',
  } as const;

  const alertStyle = ALERT_STYLES[type || 'info'];
  const textColor = TEXT_COLORS[type || 'info'];

  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${alertStyle}`}>
      <Icon
        name={icon as IconName}
        className={`${textColor} text-xl`}
      />
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
};

export default Alert;
