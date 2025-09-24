'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon } from '@riffy/components';
import Total from '@/components/common/total/Total';
import { ROUTES } from '@/constants';
import { formatDate } from '@/utils';
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
  const { cart } = useStore();

  const handleClose = () => router.push(ROUTES.RAFFLES.LIST);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="relative w-full bg-base-800 rounded-t-3xl z-10"
            style={{ height: '70vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-base-500 rounded-full" />
            </div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-base-600 hover:bg-base-600 transition-colors float-right"
              aria-label="Cerrar modal"
            >
              <Icon
                name="close"
                className="text-white transition-colors text-2xl"
              />
            </button>

            <div className="h-full flex flex-col overflow-hidden">
              <div
                className="flex-1 overflow-y-auto px-6 pb-8"
                style={{ maxHeight: 'calc(70vh - 120px)' }}
              >
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2 pt-4">
                    <h2 className="text-xl font-bold text-white">
                      Pago en espera
                    </h2>
                    <p className="text-base-300 text-base">
                      Tu pago esta en proceso de verificación.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-base-300 text-sm">Rifa:</p>
                      <h2 className="text-base font-medium text-white">
                        {cart?.raffleTitle}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base-300 text-sm">Nombre:</p>
                      <h2 className="text-base font-medium text-white">
                        {data.buyerName}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base-300 text-sm">Cedula:</p>
                      <h2 className="text-base font-medium text-white">
                        {data.nationalId}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base-300 text-sm">Telefono:</p>
                      <h2 className="text-base font-medium text-white">
                        {data.phone}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base-300 text-sm">Fecha de compra:</p>
                      <h2 className="text-base font-medium text-white">
                        {formatDate(data.paymentDate)}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base-300 text-sm">Boletos #:</p>
                      <h2 className="text-base font-medium text-white">
                        {data.tickets?.map(ticket => ticket.number).join(', ')}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <Total
                      totalTickets={cart?.totalTickets}
                      price={cart?.price}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-6 pb-6">
                <div className="flex gap-3 justify-center flex-col">
                  <Button variant="primary" onClick={handleClose}>
                    Aceptar
                  </Button>
                  <Button variant="default" onClick={handleClose}>
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
