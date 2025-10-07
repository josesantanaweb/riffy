'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStore } from '@/store';
import SidebarItem from './SidebarItem';
import { IconName } from '@riffy/components';
import { MENU, ROUTES } from '@/constants';
import { useRole } from '@/hooks';
import { filterMenuByRole } from '@/utils';
import NavBrand from '../nav-brand';

const Sidebar: React.FC = () => {
  const { collapseSidebar, isMobileSidebarOpen, setMobileSidebarOpen } =
    useStore();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const { userRole } = useRole();

  const logoutItem = MENU.find(item => item.path === ROUTES.LOGOUT);
  const menuItems = filterMenuByRole(
    MENU.filter(item => item.path !== ROUTES.LOGOUT),
    userRole
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
    'bg-base-700 h-screen transition-all duration-300 pt-5 flex-shrink-0 hidden lg:block',
    collapseSidebar ? 'w-[80px]' : 'w-[230px]',
  );

  return (
    <div className="bg-base-700 h-full fixed top-0 left-0">
      <NavBrand collapseSidebar={collapseSidebar} />
      <div className={desktopSidebarClasses}>
        <div className="flex flex-col" style={{ height: 'calc(100% - 52px)' }}>
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


    </div>
  );
};

export default Sidebar;
