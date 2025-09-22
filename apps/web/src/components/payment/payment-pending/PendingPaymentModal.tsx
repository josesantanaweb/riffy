'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Button, Icon } from '@riffy/components';
import Modal from '@/components/common/modal/Modal';
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
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="px-6 pb-8 flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white">Pago en espera</h2>
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
            <h2 className="text-base font-medium text-white">{data.buyerName}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base-300 text-sm">Cedula:</p>
            <h2 className="text-base font-medium text-white">{data.nationalId}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base-300 text-sm">Telefono:</p>
            <h2 className="text-base font-medium text-white">{data.phone}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base-300 text-sm">Fecha de compra:</p>
            <h2 className="text-base font-medium text-white">{formatDate(data.paymentDate)}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base-300 text-sm">Boletos #:</p>
            <h2 className="text-base font-medium text-white">{data.tickets?.map((ticket) => ticket.number).join(', ')}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Total totalTickets={cart?.totalTickets} price={cart?.price} />
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
    </Modal>
  );
};

export default PendingPayment;
