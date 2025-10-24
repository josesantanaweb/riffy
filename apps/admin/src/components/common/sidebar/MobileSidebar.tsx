'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import SidebarItem from './SidebarItem';
import { IconName, Icon } from '@riffy/components';
import { ASSETS, MENU, ROUTES } from '@/constants';
import { Logo } from '@riffy/components';
import { useRole } from '@/hooks';
import { filterMenuByRole } from '@/utils';
import { useTheme } from '@riffy/hooks';

const MobileSidebar: React.FC = () => {
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useStore();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const { userRole } = useRole();
  const { theme } = useTheme();

  const logoutItem = MENU.find(item => item.path === ROUTES.LOGOUT);

  const logoSrc =
    theme === 'dark' ? ASSETS.IMAGES.LOGO : ASSETS.IMAGES.LOGO_BLACK;
  const menuItems = filterMenuByRole(
    MENU.filter(item => item.path !== ROUTES.LOGOUT),
    userRole,
  );

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

  return (
    <>
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-9998 lg:hidden"
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
            className="fixed left-0 top-0 w-[280px] h-screen bg-sidebar-bg lg:hidden flex flex-col"
            style={{
              zIndex: 999999,
              top: 0,
              height: '100vh',
              position: 'fixed',
            }}
          >
            <div className="flex items-center justify-between pr-3 pl-6 py-2 lg:py-0 mb-4">
              <Logo className="w-[64px]" src={logoSrc} />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-box-secondary transition-colors"
              >
                <Icon name="arrow-back" className="text-body-100 text-xl" />
              </button>
            </div>

            <div className="flex flex-col w-full items-center flex-1">
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

export default MobileSidebar;
