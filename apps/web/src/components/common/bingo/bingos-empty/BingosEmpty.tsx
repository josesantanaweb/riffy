'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';

const EmptyBingos = (): ReactElement => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center py-10">
        <Icon name="ticket" className="text-[80px] text-body-100" />
        <h5 className="text-white text-center text-lg font-medium">
          No tienes ninguna rifa creada.
        </h5>
        <p className="text-body-100 text-center text-sm">
          Ve al panel de administración y crea tu priemera rifa
        </p>
      </div>
    </div>
  );
};

export default EmptyBingos;
