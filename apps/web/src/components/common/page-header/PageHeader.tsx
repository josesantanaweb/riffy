'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { Icon } from '@riffy/components';
import PaymentTimer from '@/components/common/payment-timer';

interface PageHeaderProps {
  title: string;
  showTimer?: boolean;
}

const PageHeader = ({ title, showTimer }: PageHeaderProps): ReactElement => {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center gap-3 text-body-100 w-full mb-3"
        onClick={handleBack}
      >
        <Icon name="arrow-back" className="text-xl" />
        <p className="text-lg">Atras</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h4 className="text-title text-xl font-medium">{title}</h4>
        {showTimer && <PaymentTimer />}
      </div>
    </div>
  );
};

export default PageHeader;
