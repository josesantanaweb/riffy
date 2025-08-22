'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onClick: () => void;
}

const LikeButton = ({
  isLiked,
  count,
  onClick,
}: LikeButtonProps): React.ReactElement => {

  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
        isLiked ? 'text-red-600' : 'text-base-300'
      }`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.span
        className={` ${isLiked ? 'icon-heart text-xl' : 'icon-heart-line text-xl'}`}
        animate={{
          rotate: isLiked ? [0, -10, 10, -10, 0] : 0,
          scale: isLiked ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      />
      {count > 0 && (
        <motion.p
          className="text-sm font-medium"
          animate={{ opacity: [0.7, 1] }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.p>
      )}
    </motion.button>
  );
};

export default LikeButton;
