'use client';
import React from 'react';
import { Icon } from '@riffy/components';

interface ActionMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  isOpen,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
      >
        <Icon name="dots" className="text-xl text-base-300 p-1" />
      </button>

      {isOpen && (
        <div className="flex flex-col bg-base-700 absolute top-10 right-0 min-w-[120px] shadow-lg z-10 rounded-lg">
          <button
            onClick={onEdit}
            className="text-base-200 hover:text-white gap-2 flex justify-center items-center text-sm px-3 py-2 transition-colors"
          >
            <Icon name="edit" className="text-sm" />
            Editar
          </button>
          <button
            onClick={onDelete}
            className="text-base-200 gap-2 flex hover:text-white justify-center items-center text-sm px-3 py-2 transition-colors"
          >
            <Icon name="trash" className="text-sm" />
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
