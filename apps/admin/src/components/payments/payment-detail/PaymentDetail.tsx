'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon } from '@riffy/components';
import { Payment, PaymentStatus } from '@riffy/types';
import { formatCurrency, formatDate } from '@/utils';
import Image from 'next/image';

interface PaymentDetailProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  payment?: Payment | null;
  onUpdateStatus?: (paymentId: string, status: PaymentStatus) => void;
}

const PaymentDetail = ({
  isOpen,
  setIsOpen,
  payment,
  onUpdateStatus,
}: PaymentDetailProps): ReactElement => {
  const handleClose = () => setIsOpen(false);

  const handleApprove = () => {
    if (payment?.id && onUpdateStatus) {
      onUpdateStatus(payment.id, PaymentStatus.VERIFIED);
    }
  };

  const handleReject = () => {
    if (payment?.id && onUpdateStatus) {
      onUpdateStatus(payment.id, PaymentStatus.DENIED);
    }
  };

  const getStatusDisplay = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.VERIFIED:
        return { text: 'Verificado', color: 'text-success-500' };
      case PaymentStatus.DENIED:
        return { text: 'Rechazado', color: 'text-danger-500' };
      case PaymentStatus.PENDING:
        return { text: 'Pendiente', color: 'text-warning-500' };
      default:
        return { text: status, color: 'text-white' };
    }
  };

  if (!payment || !payment.raffle) return null;

  return (
    <div className="relative">
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
              className="relative w-[650px] dark:bg-base-700 bg-base-800 rounded-xl"
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
              <div className="flex border-b border-base-600 px-6 py-4 items-center justify-between">
                <h3 className="dark:text-white text-base-300 font-semibold text-xl">
                  Detalle del pago
                </h3>
                <motion.button
                  onClick={handleClose}
                  className="dark:bg-base-600 bg-base-400 dark:hover:bg-base-600/80 hover:bg-base-400/80 rounded-full p-1 shadow z-10 w-[33px] h-[33px] flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Icon name="close" className="text-2xl dark:text-white text-base-300" />
                </motion.button>
              </div>

              <div className="flex flex-col p-6">
                <div className="flex items-start justify-between gap-10">
                  <div className="flex flex-col w-full gap-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-base-300 text-sm">Rifa:</p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {payment?.raffle?.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-base-200 text-sm">Nombre:</p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {payment?.buyerName}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <p className="text-base-200 text-sm">Cedula:</p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {payment?.nationalId}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-base-200 text-sm">Telefono:</p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {payment?.phone}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <p className="text-base-200 text-sm">
                          Fecha de compra:
                        </p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {formatDate(payment?.paymentDate)}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-base-200 text-sm">Boletos #</p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {payment?.tickets
                            ?.map(ticket => ticket.number)
                            .join(', ')}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <p className="text-base-200 text-sm">Monto:</p>
                        <h2 className="text-base font-medium dark:text-white text-primary">
                          {formatCurrency(payment?.amount)}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-base-200 text-sm">Estado:</p>
                        <h2
                          className={`text-base font-medium ${getStatusDisplay(payment?.status).color}`}
                        >
                          {getStatusDisplay(payment?.status).text}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="w-[200px] h-[440px] rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={payment?.proofUrl}
                      width={300}
                      height={500}
                      alt="comprobante"
                      className="w-full h-full object-fill"
                    />
                  </div>
                </div>
              </div>

              <div className="flex border-t border-base-600 px-6 py-4 items-center justify-end">
                <div className="flex items-center gap-3">
                  <Button
                    variant="default"
                    size="md"
                    onClick={handleReject}
                    disabled={payment.status !== PaymentStatus.PENDING}
                  >
                    <Icon name="close" className=" text-lg" />
                    Rechazar pago
                  </Button>
                  <Button
                    variant="success"
                    size="md"
                    onClick={handleApprove}
                    disabled={payment.status !== PaymentStatus.PENDING}
                  >
                    <Icon name="check-circle" className=" text-lg" />
                    Aceptar pago
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentDetail;
