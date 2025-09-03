'use client';
import React from 'react';
import { Icon, IconName } from '@riffy/components';
import { Tooltip } from 'react-tooltip';
import type { TableAction } from '@/components/common/data-table/types';

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
    default:
      return 'text-lg';
  }
};

const ActionMenu = <T extends Record<string, any>>({
  actions,
  row,
}: ActionMenuProps<T>) => {
  return (
    <div className="relative flex items-center">
      {actions.map(action => (
        <button
          onClick={() => action.onClick(row)}
          key={action.label}
          data-tooltip-id={`tooltip-${action.label}`}
          data-tooltip-content={action.label}
        >
          <Icon
            name={action.icon as IconName}
            className={`${getIconSize(action.icon)} text-base-300 p-1`}
          />
          <Tooltip
            id={`tooltip-${action.label}`}
            place="top"
            className="!bg-base-500 !rounded-lg text-white px-2 py-1"
            offset={30}
          />
        </button>
      ))}
    </div>
  );
};

export default ActionMenu;
