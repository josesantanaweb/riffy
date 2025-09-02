'use client';
import React from 'react';
import { Icon } from '@riffy/components';
import { motion, AnimatePresence } from 'framer-motion';
import type { TableAction } from '@/components/common/data-table/types';

interface ActionMenuProps<T = any> {
  isOpen: boolean;
  onToggle: () => void;
  actions: TableAction<T>[];
  row: T;
  closeMenu: () => void;
}

const ActionMenu = <T extends Record<string, any>>({
  isOpen,
  onToggle,
  actions,
  row,
  closeMenu,
}: ActionMenuProps<T>) => {

  const onClick = (action: TableAction<T>) => {
    action.onClick(row);
    closeMenu();
  };

  return (
    <div className="relative">
      <button onClick={onToggle}>
        <Icon name="dots" className="text-xl text-base-300 p-1" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col bg-base-700 absolute top-10 right-0 min-w-[140px] shadow-lg z-10 rounded-lg"
          >
            {actions.map(action => (
              <button
                key={action.label}
                onClick={() => onClick(action)}
                className={`text-base-200 hover:text-white gap-2 flex justify-start items-center text-sm px-3 py-2 transition-colors ${action.variant === 'danger' ? 'text-red-500 hover:text-white' : ''}`}
              >
                {action.icon && <Icon name={action.icon as any} className="text-sm" />}
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionMenu;
