'use client';
import React from 'react';
import type { ReactElement } from 'react';
import PaymentForm from './payment-form';
import PageHeader from '../common/page-header';
import { useIsIPhone } from '@/hooks';

const PaymentPage = (): ReactElement => {
  const isIPhone = useIsIPhone();

  return (
    <div
      className={`w-full h-full flex flex-col px-5 py-5 gap-3 bg-box-primary ${isIPhone ? 'pb-16' : ''}`}
    >
      <PageHeader title="Datos del pago" showTimer />
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
