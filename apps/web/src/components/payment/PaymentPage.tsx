'use client';
import React from 'react';
import type { ReactElement } from 'react';
import Alert from '@/components/common/alert/Alert';
import PaymentHeader from './payment-header';
import PaymentForm from './payment-form';

const PaymentPage = (): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col px-5 py-5 gap-3">
      <PaymentHeader />

      <Alert
        message="¿Ya has compradodo antes?"
        icon="info-circle"
        type="info"
      />

      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
