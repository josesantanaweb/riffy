'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon } from '@riffy/components';
import { Bingo, BingoStatus } from '@riffy/types';
import { formatDate } from '@riffy/utils';
import { ROUTES } from '@/constants/routes';

import BingoAlert from '@/components/common/bingo/bingo-alert';
import BingoProgress from '@/components/common/bingo/bingo-progress';
import BingoBanner from '@/components/common/bingo/bingo-banner';
import BingoTitle from '@/components/common/bingo/bingo-title';

interface BingoCardProps {
  bingo: Bingo;
  loading: boolean;
}

const BingoCard = ({ bingo, loading }: BingoCardProps): ReactElement => {
  const router = useRouter();
  const isCompleted = bingo?.status === BingoStatus.COMPLETED;

  const handleBuyBoard = () => router.push(ROUTES.BINGOS.BINGO(bingo.id));

  const handleVerifyBoard = () => router.push(ROUTES.BINGOS.VERIFY_TICKET(bingo.id));

  return (
    <div className="flex flex-col bg-box-primary">
      <BingoBanner
        banner={bingo?.banner}
        isCompleted={bingo?.status === BingoStatus.COMPLETED}
        loading={loading}
      />

      <div className="flex flex-col gap-5 p-5">
        <BingoTitle title={bingo.title} loading={loading} award={bingo?.award} />

        {bingo.showDate && (
          <BingoAlert
            message={!isCompleted ? formatDate(bingo.drawDate) : 'Completada'}
            icon="calendar"
            type={!isCompleted ? 'default' : 'success'}
          />
        )}

        {bingo.showProgress && <BingoProgress bingo={bingo} />}

        <div className="flex flex-col gap-3 mt-4">
          {!isCompleted && (
            <Button variant="primary" onClick={handleBuyBoard}>
              Comprar boleto
            </Button>
          )}

          <Button variant="default" onClick={handleVerifyBoard} disabled={true}>
            <Icon name="search" />
            Verificar boleto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BingoCard;
