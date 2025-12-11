'use client';
import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon } from '@riffy/components';
import { useIsIPhone } from '@riffy/hooks';
import { ROUTES } from '@/constants';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';

interface TermsProps {
  isOpen: boolean;
  onClose?: () => void;
}

const TermsModal = ({ isOpen, onClose }: TermsProps): ReactElement => {
  const router = useRouter();
  const { user } = useStore();
  const isIPhone = useIsIPhone();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push(ROUTES.RAFFLES.LIST);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center max-w w-full left-1/2 -translate-x-1/2">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className={`relative w-full max-w-md bg-box-primary rounded-t-3xl z-10 px-6 py-6 pb-8 ${isIPhone ? '80vh' : '75vh'}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-box-secondary rounded-full" />
            </div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-box-secondarytransition-colors float-right"
              aria-label="Cerrar modal"
            >
              <Icon
                name="close"
                className="text-white transition-colors text-2xl"
              />
            </button>

            <div
              className="flex flex-col gap-5 justify-between pt-2"
              style={{ height: 'calc(100% - 30px)' }}
            >
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-title">
                    Términos y Condiciones
                  </h2>
                  <p className="text-body-100 text-base">
                    Acepta los términos y condiciones para continuar.
                  </p>
                </div>

                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                  <p
                    className="text-body-100 text-base"
                    dangerouslySetInnerHTML={{ __html: user?.terms || '' }}
                  />
                </div>
              </div>

              <div className="shrink-0 w-full">
                <div className="flex gap-3 justify-center flex-col">
                  <Button variant="primary" onClick={handleClose}>
                    Aceptar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
