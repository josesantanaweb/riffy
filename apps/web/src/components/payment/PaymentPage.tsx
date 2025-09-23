'use client';
import React from 'react';
import type { ReactElement } from 'react';
import PaymentForm from './payment-form';
import PageHeader from '../common/page-header';

const PaymentPage = (): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col px-5 py-5 gap-3">
      <PageHeader title="Datos del pago" showTimer />
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
