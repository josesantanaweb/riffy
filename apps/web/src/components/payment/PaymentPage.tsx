'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { Button, Icon, Input, ImageUpload } from '@riffy/components';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import Alert from '@/components/common/alert/Alert';
import Total from '@/components/common/total';
import Timer from './timer';

const PaymentPage = (): ReactElement => {
  const [nationalId, setNationalId] = useState('');
  const router = useRouter();
  const { payment } = useStore();

  const handleBack = () => router.back();

  const handleChangeProofUrl = () => {
    // TODO: Implementar subida de comprobante
  };

  const handlePay = () => {
    // TODO: Implementar lógica de pago
  };

  return (
    <div className="w-full h-full flex flex-col px-5 py-5 gap-3">
      <div
        className="flex items-center gap-3 text-base-300 w-full mb-3"
        onClick={handleBack}
      >
        <Icon name="arrow-back" className="text-xl" />
        <p className="text-lg">Atras</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-xl font-medium">Datos del pago</p>
        <Timer />
      </div>

      <Alert
        message="¿Ya has compradodo antes?"
        icon="info-circle"
        type="info"
      />

      <form className="form" onSubmit={handlePay}>
        <div className="relative min-h-[400px] flex flex-col gap-2">
          <Input
            placeholder="Número de cedula"
            value={nationalId}
            onChange={e => setNationalId(e.target.value)}
            icon="search"
            iconPosition="right"
            onRightIconClick={() => setNationalId('')}
          />
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nombre"
              value={nationalId}
              onChange={e => setNationalId(e.target.value)}
            />
            <Input
              placeholder="Correo electrónico"
              value={nationalId}
              onChange={e => setNationalId(e.target.value)}
            />
            <Input
              placeholder="Teléfono"
              value={nationalId}
              onChange={e => setNationalId(e.target.value)}
            />

            <div className="w-full border border-base-500 rounded-lg p-3 flex flex-col gap-2 my-2">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-1 flex-col">
                  <p className="text-base text-base-300 font-medium">
                    Número de teléfono
                  </p>
                  <p className="text-sm text-white">04141234567</p>
                </div>
                <Icon name="copy" className="text-xl text-base-300" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-1 flex-col">
                  <p className="text-base text-base-300 font-medium">
                    Cédula de identidad
                  </p>
                  <p className="text-sm text-white">24454232</p>
                </div>
                <Icon name="copy" className="text-xl text-base-300" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-1 flex-col">
                  <p className="text-base text-base-300 font-medium">Banco</p>
                  <p className="text-sm text-white">Venezuela</p>
                </div>
                <Icon name="copy" className="text-xl text-base-300" />
              </div>
            </div>

            <div className="relative w-full flex justify-center">
              <ImageUpload
                height={200}
                placeholder="Sube imagen de comprobante de pago"
                placeholderIcon="plus-circle"
                placeholderSubtext="JPEG, PNG, WebP, GIF (máx. 10MB)"
                // value={currentBanner}
                onChange={handleChangeProofUrl}
                maxSizeMB={10}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Total totalTickets={payment?.totalTickets || 0} price={payment?.price || null} />

        <Button variant="primary" isFull type="submit" className="mt-3">
          Pagar
        </Button>
      </form>
    </div>
  );
};

export default PaymentPage;
