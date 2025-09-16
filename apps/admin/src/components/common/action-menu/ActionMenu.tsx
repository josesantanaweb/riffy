'use client';
import React from 'react';
import { Icon, IconName } from '@riffy/components';
import { Tooltip } from 'react-tooltip';
import type { TableAction } from '@/components/common/data-table/types';
import { PaymentStatus } from '@riffy/types';

interface ActionMenuProps<T = any> {
  actions: TableAction<T>[];
  row: T;
}

const getIconSize = (iconName: string): string => {
  switch (iconName) {
    case 'trash':
      return 'text-base';
    case 'edit':
      return 'text-base';
    case 'search':
      return 'text-lg';
    case 'close':
      return 'text-2xl';
    default:
      return 'text-lg';
  }
};

const getIconColor = (actionLabel: string, row: any): string => {
  if (actionLabel === 'Marcar como Verificado') {
    if (row.status === PaymentStatus.VERIFIED) {
      return 'text-green-400';
    }
  }
  return 'text-base-300';
};

const ActionMenu = <T extends Record<string, any>>({
  actions,
  row,
}: ActionMenuProps<T>) => {
  const handleActionClick = (action: TableAction<T>) => {
    action.onClick(row);
  };

  return (
    <div className="relative flex items-center">
      {actions.map(action => {
        return (
          <button
            onClick={() => handleActionClick(action)}
            key={action.label}
            data-tooltip-id={`tooltip-${action.label}`}
            data-tooltip-content={action.label}
          >
            <Icon
              name={action.icon as IconName}
              className={`${getIconSize(action.icon)} ${getIconColor(action.label, row)} p-1`}
            />
            <Tooltip
              id={`tooltip-${action.label}`}
              place="top"
              className="!bg-base-500 !rounded-lg text-white px-2 py-1"
              offset={30}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ActionMenu;
