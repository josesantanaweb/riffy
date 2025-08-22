'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type GameWinProps = {
  multiplier?: number;
  amount: number;
  open: boolean;
};

const GameWin = ({
  multiplier,
  amount,
  open,
}: GameWinProps): React.ReactElement => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="bg-base-700 p-3 w-[270px] rounded-lg absolute top-[20%] left-1/2 z-50"
        >
          <div className="w-[240px] absolute top-[15px]">
            <Image
              src="/images/minigames/modal-win.svg"
              alt="Coin Flip"
              width={100}
              height={100}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center justify-center flex-col gap-3 w-full">
            <h5 className="text-3xl font-semibold text-green-500">
              x{multiplier?.toFixed(2)}
            </h5>
            <div className="text-white w-full rounded-lg p-3 flex items-center justify-center bg-base-600 font-semibold">
              {amount} VES
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameWin;
