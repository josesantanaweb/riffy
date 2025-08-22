import React  from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { ResultEnum } from '@/types/common';
import { getMultiplierColor } from '../utils';

interface MultiplierLabelProps {
  result: ResultEnum | null;
  multiplier: number;
  value: string
}

const MultiplierLabel = ({
  result,
  multiplier,
  value,
}: MultiplierLabelProps): React.ReactElement => {

  const colorClass = getMultiplierColor(result);
  const key = result + multiplier

  return (
    <div className="flex-1 h-[50px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 70, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 70, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 0.4,
          }}
          className="flex items-center gap-1 flex-col"
        >
          <p className={`text-xl font-bold ${colorClass}`}>x{value}</p>
          <p className="text-base-300 text-xs font-medium">Multiplicador</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiplierLabel;
