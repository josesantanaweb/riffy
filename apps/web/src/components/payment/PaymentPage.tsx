'use client';
import React from 'react';
import type { ReactElement } from 'react';
import PaymentHeader from './payment-header';
import PaymentForm from './payment-form';

const PaymentPage = (): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col px-5 py-5 gap-3">
      <PaymentHeader />
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
