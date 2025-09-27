'use client';
import React, { useState, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { motion } from 'framer-motion';
import { Notification, NotificationStatus } from '@riffy/types';
import { formatRelativeTime } from '@/utils';
import { useUpdateNotification } from '@riffy/hooks';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({
  notification,
}: NotificationItemProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { updateNotification } = useUpdateNotification();

  const handleMarkReadNotification = () => {
    updateNotification(notification.id, NotificationStatus.READ);
  };

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

  return (
    <motion.div
      key={notification.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          },
        },
      }}
      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-base-600 transition-colors duration-200"
      onClick={handleMarkReadNotification}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 flex-shrink-0">
        <Icon name="credit-card" className="text-white text-base" />
      </div>
      <div className="flex flex-col">
        <p
          className={`text-sm text-medium ${notification.status === 'UNREAD' ? 'font-medium text-white' : 'font-normal text-base-300'}`}
        >
          {notification.description}
        </p>
        <p className="text-xs text-base-300">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
