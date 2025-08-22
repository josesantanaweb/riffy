'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface SoundButtonProps {
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
}

const SoundButton = ({
  isMuted = false,
  setIsMuted,
}: SoundButtonProps): React.ReactElement => {
  return (
    <motion.button
      onClick={() => setIsMuted(!isMuted)}
      className="flex items-center gap-1 transition-colors duration-200 cursor-pointer"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.span
        className={`text-base-300 ${isMuted ? 'text-base icon-mute' : 'text-xl icon-volumen'}`}
        animate={{
          rotate: isMuted ? [0, -10, 10, -10, 0] : 0,
          scale: isMuted ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};

export default SoundButton;
