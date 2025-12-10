'use client';
import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon } from '@riffy/components';
import TotalBox from '@/components/payment/payment-total';
import { useIsIPhone } from '@riffy/hooks';
import { ROUTES } from '@/constants';
import { formatDate } from '@riffy/utils';
import { Payment } from '@riffy/types';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';

interface PendingPaymentProps {
  isOpen: boolean;
  data: Payment;
}

const PendingPayment = ({
  isOpen,
  data,
}: PendingPaymentProps): ReactElement => {
  const router = useRouter();
  const { cart, user } = useStore();
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

  const handleClose = () => router.push(ROUTES.RAFFLES.LIST);

  const handleHelp = () => window.open(`https://wa.me/58${user.whatsapp}`, '_blank');

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

            <div className="flex flex-col gap-5 justify-between pt-2" style={{ height: 'calc(100% - 30px)' }}>
              <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-title">
                    Pago en espera
                  </h2>
                  <p className="text-body-100 text-base">
                    Tu pago esta en proceso de verificación.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-body-100 text-sm">Rifa:</p>
                    <h2 className="text-base font-medium text-title">
                      {cart?.raffleTitle}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <p className="text-body-100 text-sm">Nombre:</p>
                      <h2 className="text-base font-medium text-title">
                        {data.buyerName}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-body-100 text-sm">Cedula:</p>
                      <h2 className="text-base font-medium text-title">
                        {data.nationalId}
                      </h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <p className="text-body-100 text-sm">Telefono:</p>
                      <h2 className="text-base font-medium text-title">
                        {data.phone}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-body-100 text-sm">Fecha de compra:</p>
                      <h2 className="text-base font-medium text-title">
                        {formatDate(data.paymentDate)}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-body-100 text-sm">Tickets #:</p>
                    <h2 className="text-base font-medium text-title">
                      {data.tickets?.map(ticket => ticket.number).join(', ')}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <TotalBox
                    totalTickets={cart?.totalTickets}
                    price={cart?.price}
                  />
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

export default PendingPayment;
