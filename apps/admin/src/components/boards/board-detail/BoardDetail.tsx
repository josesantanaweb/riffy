'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon, Select } from '@riffy/components';
import { Board, BoardStatus } from '@riffy/types';
import { useToast } from '@/hooks';
import { useUpdateBoardStatus } from '@riffy/hooks';
import { formatCurrency, formatDate } from '@riffy/utils';

interface BoardDetailProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  board?: Board | null;
}

const BoardDetail = ({
  isOpen,
  setIsOpen,
  board,
}: BoardDetailProps): ReactElement => {
  const toast = useToast();
  const { updateBoardStatus } = useUpdateBoardStatus();
  const [status, setStatus] = useState<string>(
    board?.status || BoardStatus.WINNER,
  );
  const handleClose = () => setIsOpen(false);

  const getStatusDisplay = (status: BoardStatus | string) => {
    switch (status) {
      case BoardStatus.AVAILABLE:
        return { text: 'Disponible', color: 'text-title' };
      case BoardStatus.SOLD:
        return { text: 'Vendido', color: 'text-white' };
      case BoardStatus.WINNER:
        return { text: 'Ganador', color: 'text-success-500' };
      case BoardStatus.LOSER:
        return { text: 'Perdedor', color: 'text-danger-500' };
      case BoardStatus.PREMIUM:
        return { text: 'Premium', color: 'text-body-100' };
      default:
        return { text: status, color: 'text-white' };
    }
  };

  const boardStatusOptions = [
    BoardStatus.WINNER,
    BoardStatus.LOSER,
    BoardStatus.PREMIUM,
  ].map(status => ({
    value: status,
    label: getStatusDisplay(status).text,
  }));

  const handleSave = async () => {
    try {
      await updateBoardStatus(board.id, status as BoardStatus);
      toast.success(`Estado actualizado a ${status} exitosamente`);
      setIsOpen(false);
    } catch {
      toast.error('Error al actualizar el estado del board');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative w-[480px] bg-box-primary rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex border-b border-line-100 px-6 py-4 items-center justify-between">
                <h3 className="text-title font-semibold text-xl">
                  Detalle del boleto
                </h3>
                <motion.button
                  onClick={handleClose}
                  className="bg-box-secondary hover:bg-box-secondary/80 rounded-full p-1 shadow z-10 w-[33px] h-[33px] flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Icon name="close" className="text-2xl text-body-100" />
                </motion.button>
              </div>

              <div className="flex flex-col p-6">
                <div className="flex items-start justify-between gap-10">
                  <div className="flex flex-col w-full gap-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-body-100 text-sm">Rifa:</p>
                        <h2 className="text-base font-medium text-title">
                          {board.bingo?.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-body-100 text-sm">Nombre:</p>
                        <h2 className="text-base font-medium text-title">
                          {board.payment?.buyerName || 'N/A'}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <p className="text-body-100 text-sm">Cedula:</p>
                        <h2 className="text-base font-medium text-title">
                          {board.payment?.nationalId || 'N/A'}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-body-100 text-sm">Telefono:</p>
                        <h2 className="text-base font-medium text-title">
                          {board.payment?.phone || 'N/A'}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <p className="text-body-100 text-sm">
                          Fecha de compra:
                        </p>
                        <h2 className="text-base font-medium text-title">
                          {board.payment?.paymentDate
                            ? formatDate(board.payment?.paymentDate)
                            : 'N/A'}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-body-100 text-sm">Boletos #</p>
                        <h2 className="text-base font-medium text-title">
                          {board.number || 'N/A'}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <p className="text-body-100 text-sm">Monto:</p>
                        <h2 className="text-base font-medium text-title">
                          {board.payment?.amount
                            ? formatCurrency(board.payment?.amount)
                            : 'N/A'}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-body-100 text-sm">Estado:</p>
                        <h2
                          className={`text-base font-medium ${getStatusDisplay(board.status).color}`}
                        >
                          {getStatusDisplay(board.status).text}
                        </h2>
                      </div>
                    </div>
                    <div className="flex">
                      <Select
                        options={boardStatusOptions}
                        label="Selecciona un estado"
                        value={status}
                        onChange={setStatus}
                        size="md"
                        placeholder="Elige un estado..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex border-t border-line-100 px-6 py-4 items-center justify-end">
                <div className="flex items-center gap-3">
                  <Button variant="default" size="md" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant="success"
                    size="md"
                    onClick={handleSave}
                    disabled={status.trim() === board?.status?.trim()}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardDetail;
