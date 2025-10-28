'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { useToast } from '@/hooks/useToast';
import type { PaymentMethod, PaymentMethodType } from '@riffy/types';

interface PaymentMethodProps {
  paymentMethod: PaymentMethod | undefined;
}

const PaymentMethodBox = ({ paymentMethod }: PaymentMethodProps): ReactElement => {
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  if (!paymentMethod) {
    return (
      <div className="w-full border border-line-100 rounded-lg p-3 flex flex-col gap-4 my-2">
        <div className="text-center text-body-100">
          <p>Selecciona un método de pago</p>
        </div>
      </div>
    );
  }

  const renderPagoMovilInfo = () => (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-1 flex-col">
          <p className="text-base text-body-100 font-medium">
            Número de teléfono
          </p>
          <p className="text-sm text-title">
            {paymentMethod.phoneNumber || 'No disponible'}
          </p>
        </div>
        <Icon
          name="copy"
          className="text-xl text-body-100 cursor-pointertransition-colors"
          onClick={() => copyToClipboard(paymentMethod.phoneNumber || '')}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-1 flex-col">
          <p className="text-base text-body-100 font-medium">
            Cédula de identidad
          </p>
          <p className="text-sm text-title">
            {paymentMethod.nationalId || 'No disponible'}
          </p>
        </div>
        <Icon
          name="copy"
          className="text-xl text-body-100 cursor-pointer transition-colors"
          onClick={() => copyToClipboard(paymentMethod.nationalId || '')}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-1 flex-col">
          <p className="text-base text-body-100 font-medium">Banco</p>
          <p className="text-sm text-title">
            {paymentMethod.bankName || 'No disponible'}
          </p>
        </div>
        <Icon
          name="copy"
          className="text-xl text-body-100 cursor-pointer transition-colors"
          onClick={() => copyToClipboard(paymentMethod.bankName || '')}
        />
      </div>
    </>
  );

  const renderBinancePayInfo = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-1 flex-col">
        <p className="text-base text-body-100 font-medium">ID de Binance</p>
        <p className="text-sm text-title">
          {paymentMethod.binanceId || 'No disponible'}
        </p>
      </div>
      <Icon
        name="copy"
        className="text-xl text-body-100 cursor-pointer transition-colors"
        onClick={() => copyToClipboard(paymentMethod.binanceId || '')}
      />
    </div>
  );

  const renderPaypalInfo = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-1 flex-col">
        <p className="text-base text-body-100 font-medium">Correo electrónico</p>
        <p className="text-sm text-title">
          {paymentMethod.paypalEmail || 'No disponible'}
        </p>
      </div>
      <Icon
        name="copy"
        className="text-xl text-body-100 cursor-pointer transition-colors"
        onClick={() => copyToClipboard(paymentMethod.paypalEmail || '')}
      />
    </div>
  );

  const renderPaymentInfo = () => {
    switch (paymentMethod.type as PaymentMethodType) {
      case 'PAGO_MOVIL':
        return renderPagoMovilInfo();
      case 'BINANCE_PAY':
        return renderBinancePayInfo();
      case 'PAYPAL':
        return renderPaypalInfo();
      default:
        return (
          <div className="text-center text-body-100">
            <p>Tipo de método de pago no reconocido</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full border border-line-500 rounded-lg p-3 flex flex-col gap-4 my-2">
      {renderPaymentInfo()}
    </div>
  );
};

export default PaymentMethodBox;
