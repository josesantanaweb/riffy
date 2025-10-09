'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@riffy/components';

interface PaymentProofProps {
  proofUrl: string;
}

const PaymentProof = ({ proofUrl }: PaymentProofProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  if (!proofUrl) return <p>N/A</p>;

  return (
    <div className="relative">
      <motion.div
        className="relative w-10 h-10 rounded-lg cursor-pointer overflow-hidden"
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image
          src={proofUrl}
          alt="Comprobante"
          width={100}
          height={100}
          className=""
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                onClick={handleClose}
                className="absolute top-2 right-2 bg-base-600 hover:bg-base-600/80 rounded-full p-1 shadow z-10 w-[33px] h-[33px] flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.8)' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon name="close" className="text-2xl text-white" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <Image
                  src={proofUrl}
                  alt="Comprobante"
                  width={500}
                  height={500}
                  className="max-w-[90vw] max-h-[90vh] rounded-lg object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentProof;
