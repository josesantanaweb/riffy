'use client';
import React, { useState, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationItem from './notification-item';
import { useNotifications, useUpdateNotifications } from '@riffy/hooks';
import { NotificationStatus } from '@riffy/types';

const Notifications = (): ReactElement => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: notifications } = useNotifications();
  const { updateNotifications, loading: isUpdating } = useUpdateNotifications();

  const unreadCount = notifications?.filter(
    notification => notification.status === NotificationStatus.UNREAD,
  ).length || 0;

  const handleMarkAllAsRead = async () => {
    if (!notifications || notifications.length === 0) return;

    const unreadNotifications = notifications.filter(
      notification => notification.status === NotificationStatus.UNREAD
    );

    if (unreadNotifications.length === 0) return;

    const unreadIds = unreadNotifications.map(notification => notification.id);

    try {
      await updateNotifications(unreadIds, NotificationStatus.READ);
    } catch {
      //
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

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

  const handleRedirectToPayments = () => router.push(ROUTES.PAYMENTS.LIST);

  return (
    <div className="relative h-full flex items-center isolate" ref={dropdownRef}>
      <button
        className="relative"
        onClick={toggleDropdown}
        aria-label="Ver notificaciones"
      >
        <motion.div
          animate={unreadCount > 0 ? {
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: unreadCount > 0 ? Infinity : 0,
            repeatDelay: 3
          }}
        >
          <Icon name="bell" className="text-base-300" />
        </motion.div>
        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white bg-primary-500 text-[10px] absolute -top-1 -right-1">
          {unreadCount}
        </span>
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
            className="flex flex-col gap-2 dark:bg-base-700 bg-base-800 rounded-xl absolute top-full -right-[110px] md:right-0 min-w-[360px] border-t-2 border-primary-500 z-10 mt-2"
          >
            <div className="flex justify-between items-center border-b border-base-500 p-4">
              <p className="text-base dark:text-white text-primary">Notificaciones</p>
              <button
                className={`text-sm font-medium cursor-pointer transition-colors ${
                  isUpdating
                    ? 'text-base-400 cursor-not-allowed'
                    : 'text-base-300 hover:text-primary-500'
                }`}
                onClick={handleMarkAllAsRead}
                disabled={isUpdating || unreadCount === 0}
              >
                {isUpdating ? 'Marcando...' : 'Marcar todas como leídas'}
              </button>
            </div>
            <motion.div
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {notifications?.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
              <motion.div
                onClick={handleRedirectToPayments}
                className="flex items-center justify-center p-4 border-t border-base-500"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    },
                  },
                }}
              >
                <p className="text-sm text-primary-500 font-medium cursor-pointer">
                  Ver todas
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
