'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Icon } from '@riffy/components';
import { useRouter } from 'next/navigation';
import Timer from '../../common/timer';

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
        className="flex items-center gap-3 text-base-300 w-full mb-3"
        onClick={handleBack}
      >
        <Icon name="arrow-back" className="text-xl" />
        <p className="text-lg">Atras</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="dark:text-white text-primary text-xl font-medium">{title}</p>
        {showTimer && <Timer />}
      </div>
    </div>
  );
};

export default PageHeader;
