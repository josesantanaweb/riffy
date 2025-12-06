'use client';
import React, { useState, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Icon, Switch } from '@riffy/components';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@riffy/types';
import { useAuth, useTheme } from '@riffy/hooks';
import { roleLabel } from '@/utils';
import { ROUTES } from '@/constants';

interface NavUserProps {
  profile: User;
}

const NavUser = ({ profile }: NavUserProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleProfile = () => router.push(ROUTES.PROFILE);

  return (
    <div
      className="relative h-full flex items-center isolate"
      ref={dropdownRef}
    >
      <button
        className="flex items-center gap-3 cursor-pointer ml-2"
        onClick={toggleDropdown}
        aria-label="Menú de usuario"
      >
        <Avatar name={profile?.name} src={profile?.logo} size={35} />
        <div className="flex flex-col items-start">
          <span className="text-title text-sm font-medium capitalize">
            {profile?.name}
          </span>
          <span className="text-body-100 text-[10px] font-medium">
            {roleLabel(profile?.role)}
          </span>
        </div>
        <Icon
          name="chevron-down"
          className={`text-body-100 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="flex flex-col bg-navbar-user-bg shadow-lg rounded-xl absolute top-full right-0 min-w-[290px] border-t-2 border-primary-500 z-10 mt-2 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 bg-box-secondary">
              <Avatar name={profile?.name} src={profile?.logo} size={40} />
              <div className="flex flex-col">
                <span className="text-title text-base font-medium capitalize">
                  {profile?.name}
                </span>
                <span className="text-body-100 text-xs font-medium">
                  {roleLabel(profile?.role)}
                </span>
              </div>
            </div>

            <div className="flex flex-col h-[130px]">
              <button
                onClick={handleProfile}
                className="flex items-center gap-3 px-4 py-3 text-left text-body-100 hover:bg-navbar-user-item-bg-hover transition-colors"
              >
                <Icon name="user" className="text-base" />
                <span className="text-sm">Mi Perfil</span>
              </button>

              <div className="flex gap-5 px-4 py-3 text-left text-body-100 hover:bg-navbar-user-item-bg-hov transition-colors w-full items-center">
                <div className="flex gap-3 items-center">
                  <Icon
                    name={theme === 'dark' ? 'sun' : 'moon'}
                    className="text-base"
                  />
                  <span className="text-sm">
                    {theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
                  </span>
                </div>
                <Switch checked={theme === 'dark'} onChange={toggleTheme} />
              </div>
            </div>
            <div className="border-t border-line-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-left text-body-100 hover:bg-navbar-user-item-bg-hov transition-colors w-full"
              >
                <Icon name="logout" className="text-base" />
                <span className="text-sm">Cerrar sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavUser;
