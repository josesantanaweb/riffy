'use client';
import React from 'react';
import Image from 'next/image';
import { Button, Icon } from '@riffy/components';
import { ASSETS } from '@/constants/assets';
import Alert from '@/components/common/alert';
import Progress from '@/components/common/progress';
import type { ReactElement } from 'react';

const RaffleCard = (): ReactElement => {
  return (
    <div className="flex flex-col bg-base-700 rounded-xl overflow-hidden">
      <div className="w-full h-[340px]">
        <Image
          src={ASSETS.IMAGES.BANNER}
          alt="raffle banner"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-3 border-b border-base-500 pb-4">
          <h1 className="text-2xl font-bold text-white">
            Rifa Toyota 4runner 2025 TRD
          </h1>
        </div>
        <Alert />
        <Progress />
        <div className="flex flex-col gap-3 mt-4">
          <Button variant="primary">Comprar boleto</Button>
          <Button variant="default">
            <Icon name="search" />
            Verificar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RaffleCard;
