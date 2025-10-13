'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb, Button, Icon } from '@riffy/components';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

const PageHeader = ({ title, subtitle, showBackButton }: PageHeaderProps) => {
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col">
        <h3 className="dark:text-white text-primary text-lg font-semibold">{title}</h3>
        <Breadcrumb page={subtitle} />
      </div>
      {showBackButton && (
        <Button size="md" onClick={handleBack} type="button">
          <Icon name="arrow-back" />
          Volver
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
