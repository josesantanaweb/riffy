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

  const handleHelp = () =>
    window.open(`https://wa.me/58${user.whatsapp}`, '_blank');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end max-w-md w-full left-1/2 -translate-x-1/2">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className={`relative w-full bg-box-primary rounded-t-3xl z-10 px-6 py-6 pb-8 ${isIPhone ? '80vh' : '75vh'}`}
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
              <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-title">
                    Términos y Condiciones
                  </h2>
                  <p className="text-body-100 text-base">
                    Acepta los términos y condiciones para continuar.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-body-100 text-base">
                    Los números disponibles para la compra en cada uno de
                    nuestros sorteos se especificarán en la página de detalles
                    correspondiente a cada sorteo. •⁠ ⁠Los tickets serán
                    enviados en un plazo de 24 horas debido al alto volumen de
                    pagos por procesar. •⁠ ⁠Solo podrán participar personas
                    naturales mayores de 18 años, con nacionalidad venezolana o
                    extranjeros que residan legalmente en Venezuela. •⁠ ⁠La
                    compra mínima requerida para participar en nuestros sorteos
                    es de dos tickets. Los tickets serán asignados de manera
                    aleatoria y enviados al correo electrónico proporcionado por
                    el participante. •⁠ ⁠Los premios deberán ser retirados
                    personalmente en la ubicación designada para cada sorteo.
                    Luxor realizará entrega personal únicamente en la dirección
                    indicada por el ganador del primer premio o premio mayor. •⁠
                    ⁠Los ganadores aceptan que Luxor difunda fotografías y
                    videos con su presencia en las redes sociales y durante la
                    entrega de los premios. Esto es obligatorio.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full">
                <div className="flex gap-3 justify-center flex-col">
                  <Button variant="primary" onClick={handleClose}>
                    Aceptar
                  </Button>
                  <Button variant="default" onClick={handleHelp}>
                    <Icon name="whatsapp" className="text-white text-2xl" />
                    Ayuda
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
