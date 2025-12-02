'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useParams } from 'next/navigation';
import { useIsIPhone } from '@riffy/hooks';
import PageHeader from '../common/page-header';
import Search from '../common/search';
import Boards from './boards/Boards';
import { useBoardsByNationalId } from '@riffy/hooks';

const BoardsPage = (): ReactElement => {
  const isIPhone = useIsIPhone();
  const bingoId = useParams().bingoId as string | undefined;
  const [nationalId, setNationalId] = useState<string>('');
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  const {
    data: boards,
    bingo,
    loading,
  } = useBoardsByNationalId(bingoId, searchTriggered ? nationalId : '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchNationalId = () => {
    if (nationalId.trim().length > 0) {
      setSearchTriggered(true);
    }
  };

  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNationalId(value);

    if (value.trim().length === 0) {
      setSearchTriggered(false);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col px-5 py-5 gap-3 bg-box-primary min-h-screen ${isIPhone ? 'pb-16' : ''}`}
      style={{
        overflowX: 'hidden',
        touchAction: 'pan-y',
      }}
    >
      <PageHeader title="Buscar cartones" />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Search
            placeholder="Cédula de identidad"
            value={nationalId}
            loading={loading}
            onClick={handleSearchNationalId}
            onChange={handleNationalIdChange}
          />
          {searchTriggered && !loading && boards.length > 0 && (
            <p className="text-sm font-medium text-body-100 text-right">
              {boards?.length} {boards?.length === 1 ? 'boleto' : 'cartones'}{' '}
              encontrados
            </p>
          )}
        </div>

        {searchTriggered && !loading && boards.length === 0 && (
          <div className="text-gray-500 text-center p-4">
            No se encontraron cartones para esta cédula
          </div>
        )}

        {boards?.length > 0 && <Boards boards={boards} bingo={bingo} />}
      </div>
    </div>
  );
};

export default BoardsPage;
