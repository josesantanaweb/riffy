'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@riffy/components';
import { useIsIPhone } from '@riffy/hooks';
import Alert from '@/components/common/bingo/bingo-alert';
import Boards from './boards/Boards';
import BingoProgress from '@/components/common/bingo/bingo-progress';
import TotalBox from '@/components/payment/payment-total';
import { useBingo } from '@riffy/hooks';
import { formatDate } from '@riffy/utils';
import { useStore } from '@/store';
import { ROUTES } from '@/constants';
import { BingoStatus } from '@riffy/types';
import BingoBanner from '@/components/common/bingo/bingo-banner';
import BingoTitle from '@/components/common/bingo/bingo-title';
import BoardTitle from '@/components/common/boards/board-title';

const BingoPage = (): ReactElement => {
  const router = useRouter();
  const isIPhone = useIsIPhone();
  const { bingoId } = useParams();
  const { setCart } = useStore();
  const { data: bingo, loading } = useBingo(bingoId as string);
  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
  const [isRandomBoards, setIsRandomBoards] = useState<boolean>(false);

  useEffect(() => {
    setCart({
      boardIds: selectedBoards,
      amount: (bingo?.price || 0) * selectedBoards.length,
      price: bingo?.price || 0,
      totalBoards: selectedBoards.length,
      bingoTitle: bingo?.title,
      bingoId: bingo?.id,
    });
  }, [selectedBoards, setCart, bingo]);

  useEffect(() => {
    setSelectedBoards([]);
  }, [isRandomBoards]);

  const handlePay = () => router.push(ROUTES.PAYMENT);

  return (
    <div className={`w-full h-full flex flex-col ${isIPhone ? 'pb-16' : ''}`}>
      <BingoBanner
        banner={bingo?.banner}
        isCompleted={bingo?.status === BingoStatus.COMPLETED}
        loading={loading}
      />
      <div className="flex flex-col gap-5 p-5 bg-box-primary">
        <BingoTitle title={bingo?.title} loading={loading} award={bingo?.award} />

        {bingo?.showDate && (
          <Alert
            message={formatDate(bingo?.drawDate)}
            icon="calendar"
            type="default"
          />
        )}

        {bingo?.showProgress && <BingoProgress bingo={bingo} />}

        <BoardTitle isRandomBoards={isRandomBoards} />

        <Boards
          boards={bingo?.boards || []}
          loading={loading}
          selectedBoards={selectedBoards}
          setSelectedBoards={setSelectedBoards}
          isRandomBoards={isRandomBoards}
          setIsRandomBoards={setIsRandomBoards}
          minBoards={bingo?.minBoards}
          maxBoards={bingo?.maxBoards}
        />

        <Alert
          message={`La compra minima es de ${bingo?.minBoards} cartones`}
          icon="info-circle"
          type="warning"
        />

        <div className="w-full max-w-md py-5 flex flex-col gap-3">
          <TotalBox totalBoards={selectedBoards.length} price={bingo?.price} />

          <Button
            variant="primary"
            isFull
            disabled={selectedBoards.length < bingo?.minBoards}
            onClick={handlePay}
          >
            Pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BingoPage;
