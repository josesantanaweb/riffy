'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import SidebarItem from './SidebarItem';
import { IconName, Icon } from '@riffy/components';
import { ASSETS, MENU, ROUTES } from '@/constants';
import { Logo } from '@riffy/components';

const Sidebar: React.FC = () => {
  const { collapseSidebar, isMobileSidebarOpen, setMobileSidebarOpen } =
    useStore();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const logoutItem = MENU.find(item => item.path === ROUTES.LOGOUT);
  const menuItems = MENU.filter(item => item.path !== ROUTES.LOGOUT);

  const toggleDropdown = (label: string) => {
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
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const target = e.target as Node;

      if (isMobileSidebarOpen && sidebar && !sidebar.contains(target)) {
        setMobileSidebarOpen(false);
      }
    };

    if (isMobileSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileSidebarOpen, setMobileSidebarOpen]);

  const desktopSidebarClasses = clsx(
    'bg-base-700 h-screen transition-all duration-300 pt-10 flex-shrink-0 hidden lg:block relative z-10',
    collapseSidebar ? 'w-[80px]' : 'w-[230px]',
  );

  return (
    <>
      <div className={desktopSidebarClasses}>
        <div
          className="flex flex-col"
          style={{ height: 'calc(100% - 52px)' }}
        >
          <div className="flex flex-col items-center w-full flex-1">
            {!collapseSidebar && (
              <span className="mb-2 px-4 uppercase text-sm text-base-300 font-medium text-left w-full">
                Menu
              </span>
            )}

            <div className="flex flex-col w-full items-center">
              {menuItems.map(item => (
                <SidebarItem
                  key={item.label}
                  item={{ ...item, icon: item.icon as IconName }}
                  isOpen={openDropdowns.has(item.label)}
                  toggleDropdown={toggleDropdown}
                  isCollapse={collapseSidebar}
                />
              ))}
            </div>
          </div>

          {logoutItem && (
            <div className="w-full px-4 pb-4 mt-auto">
              <SidebarItem
                key={logoutItem.label}
                item={{ ...logoutItem, icon: logoutItem.icon as IconName }}
                isOpen={false}
                toggleDropdown={toggleDropdown}
                isCollapse={collapseSidebar}
              />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            id="mobile-sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 w-[280px] h-screen bg-base-700 lg:hidden z-50 flex flex-col"
          >
            <div className="flex items-center justify-between pr-3 pl-6 py-2 lg:py-0 mb-4">
              <Logo className="w-[64px]" src={ASSETS.IMAGES.LOGO} />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-base-600 transition-colors"
              >
                <Icon name="arrow-back" className="text-white text-xl" />
              </button>
            </div>

            <div className="flex flex-col w-full items-center flex-1 px-4">
              {menuItems.map(item => (
                <SidebarItem
                  key={item.label}
                  item={{ ...item, icon: item.icon as IconName }}
                  isOpen={openDropdowns.has(item.label)}
                  toggleDropdown={toggleDropdown}
                  isCollapse={false}
                  onItemClick={() => setMobileSidebarOpen(false)}
                />
              ))}
            </div>

            {logoutItem && (
              <div className="w-full px-4 pb-4 mt-auto">
                <SidebarItem
                  key={logoutItem.label}
                  item={{ ...logoutItem, icon: logoutItem.icon as IconName }}
                  isOpen={false}
                  toggleDropdown={toggleDropdown}
                  isCollapse={false}
                  onItemClick={() => setMobileSidebarOpen(false)}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
