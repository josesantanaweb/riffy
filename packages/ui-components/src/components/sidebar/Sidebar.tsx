'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarItem from './SidebarItem';
import { Item } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menu?: Item[];
}

const Sidebar = ({
  isOpen,
  setIsOpen,
  menu = [],
}: SidebarProps): React.ReactElement => {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleMenu = (label: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 w-full md:max-w-md left-1/2 -translate-x-1/2 backdrop-blur-sm top-[70px] z-50 flex items-end justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex items-start justify-start flex-col px-6 w-2/3 md:w-[340px] h-full bg-base-900 z-50 fixed left-0 top-0"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between py-3 w-full">
              <h6 className="text-white text-base font-semibold uppercase">
                Menú
              </h6>
              <button onClick={handleClose}>
                <span className="icon-chevrons-left text-base-300 text-2xl" />
              </button>
            </div>
            <div className="flex flex-col w-full">
              {menu.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  toggleMenu={toggleMenu}
                  isOpen={openDropdowns.has(item.label)}
                  onClose={handleClose}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
