'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Logo } from '@riffy/components';
import Image from 'next/image';
import { useStore } from '@/store';
import { formatDate } from '@riffy/utils';
import { Board as IBoard, Bingo } from '@riffy/types';

interface BoardProps {
  board: IBoard;
  bingo: Bingo;
}

const Board = ({ board, bingo }: BoardProps): ReactElement => {
  const { user } = useStore();

  const getBoardStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sold':
        return {
          text: 'Pendiente',
          color: 'text-body-100',
          bgColor: 'bg-box-primary',
        };
      case 'winner':
        return {
          text: 'Ganador',
          color: 'text-success-500',
          bgColor: 'bg-success/20',
        };
      case 'loser':
        return {
          text: 'Perdedor',
          color: 'text-danger-500',
          bgColor: 'bg-danger/20',
        };
      case 'premium':
        return {
          text: 'Premium',
          color: 'text-body-100',
          bgColor: 'bg-box-secondary',
        };
      case 'available':
        return {
          text: 'Disponible',
          color: 'text-body-100',
          bgColor: 'bg-box-primary',
        };
      default:
        return {
          text: status,
          color: 'text-body-100',
          bgColor: 'bg-box-primary',
        };
    }
  };

  const boardStatus = getBoardStatus(board.status);

  return (
    <div className="relative flex flex-col gap-3 items-center">
      <div
        className="relative bg-box-secondary rounded-2xl overflow-hidden w-full"
        data-board-id={board.id}
      >
        <div className="absolute left-0 top-[200px] bg-box-primary transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
        <div className="absolute right-0 top-[200px] bg-box-primary transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />

        <div className="absolute left-0 right-0 top-[200px] transform -translate-y-1/2 h-0 border-t-2 border-dashed border-line-100">
          <div className="absolute left-0 top-1/2 bg-box-primary transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
          <div className="absolute right-0 top-1/2 transform bg-box-primary -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full" />
        </div>

        <div className="p-6 h-[200px] flex items-center justify-center relative">
          <div className="flex items-center justify-center absolute h-[25px] px-3 right-5 top-5 bg-box-secondary rounded-lg p-2">
            <h4 className="text-title text-sm font-medium">#{board.number}</h4>
          </div>
          <div className="flex items-center justify-center">
            <Logo className="w-[90px]" src={user?.logo} />
          </div>
        </div>

        <div className="p-6 h-[310px] flex items-center flex-col">
          <div className="flex flex-col gap-6 w-full justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden rounded-lg shrink-0">
                <Image
                  src={bingo?.banner}
                  alt={bingo?.title}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-100 text-sm">Rifa:</p>
                <h2 className="text-base font-medium text-title line-clamp-1">
                  {bingo?.title || 'Rifa no disponible'}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-body-100 text-sm">Nombre:</p>
                <h2 className="text-base font-medium text-title capitalize">
                  {board.payment?.buyerName}
                </h2>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-100 text-sm">Cedula:</p>
                <h2 className="text-base font-medium text-title capitalize">
                  {board.payment?.nationalId}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-body-100 text-sm">Precio:</p>
                <h2 className="text-base font-medium text-title capitalize">
                  {board.payment?.amount}
                </h2>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-100 text-sm">Estado:</p>
                <h2 className={`text-base font-medium ${boardStatus.color}`}>
                  {boardStatus.text}
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-body-100 text-sm">Fecha de compra:</p>
              <h2 className="text-base font-medium text-title">
                {formatDate(board.payment?.paymentDate)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
