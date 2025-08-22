'use client';
import { motion } from 'framer-motion';
import { ResultEnum } from '@/types';
import { getResultTextColor } from '../utils';

interface LimboValueProps {
  value: string;
  result: ResultEnum | null;
}

const LimboValue = ({ value, result }: LimboValueProps): React.ReactElement => {
  return (
    <motion.h1
      className={`text-5xl font-black ${getResultTextColor(result)}`}
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: 0.4,
      }}
    >
      {value}x
    </motion.h1>
  );
};

export default LimboValue;
