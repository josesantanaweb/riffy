'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { Button, Icon, Input } from '@riffy/components';
import Alert from '@/components/common/alert/Alert';
import Total from '@/components/common/total';

const PaymentPage = (): ReactElement => {
  const [nationalId, setNationalId] = useState('');
  return (
    <div className="w-full h-full flex flex-col px-5 py-5 gap-3">
      <div className="flex items-center gap-3 text-base-300 w-full mb-3">
        <Icon name="arrow-back" className="text-xl" />
        <p className="text-lg">Atras</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-2xl font-medium">Datos del pago</p>
        <div className="flex items-center gap-2 text-danger-500">
          <Icon name="tiktok" className="text-lg clas" />
          <p className="text-base">30:00</p>
        </div>
      </div>

      <Alert
        message="¿Ya has compradodo antes?"
        icon="info-circle"
        type="info"
      />

      <div className="flex flex-col gap-2 min-h-[400px]">
        <Input
          placeholder="Número de cedula"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          icon="search"
          iconPosition="right"
          onRightIconClick={() => setNationalId('')}
        />
      </div>

      <Total totalTickets={0} price={0} />

      <Button variant="primary" isFull>
        Pagar
      </Button>
    </div>
  );
};

export default PaymentPage;
