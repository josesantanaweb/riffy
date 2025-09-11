'use client';
import React from 'react';
import { Icon } from '@riffy/components';
import type { ReactElement } from 'react';

const Alert = (): ReactElement => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-transparent">
      <Icon name="calendar" className="text-primary-500 text-xl" />
      <p className="text-sm text-primary-500">20 de Agosto de 2025</p>
    </div>
  );
};

export default Alert;
