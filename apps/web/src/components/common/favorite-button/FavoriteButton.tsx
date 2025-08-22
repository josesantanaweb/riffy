'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  isFavorite: boolean;
  setIsFavorite: (isFavorite) => void;
  variant?: 'default' | 'small';
}

const FavoriteButton = ({
  isFavorite,
  setIsFavorite,
  variant = 'default',
}: FavoriteButtonProps): React.ReactElement => {
  const handleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <motion.button
      onClick={handleFavorite}
      className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer ${isFavorite ? 'text-orange-500' : 'text-base-300'}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className={`${isFavorite ? 'icon-star text-xl' : 'icon-star-line text-2xl'}`}
        animate={{
          rotate: isFavorite ? [0, -10, 10, -10, 0] : 0,
          scale: isFavorite ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />
      {variant === 'default' && (
        <motion.p
          className="text-base font-medium"
          animate={{ opacity: [0.7, 1] }}
          transition={{ duration: 0.3 }}
        >
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </motion.p>
      )}
    </motion.button>
  );
};

export default FavoriteButton;
