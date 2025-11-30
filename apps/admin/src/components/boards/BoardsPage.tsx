'use client';
import { useState, useEffect } from 'react';
import { useBingos, useBoardsByBingo } from '@riffy/hooks';
import { Input, Select } from '@riffy/components';
import PageHeader from '@/components/common/page-header';
import BoardDetail from './board-detail';
import { Board, BoardStatus } from '@riffy/types';
import BoardsGrid from './boards-grid';
import BoardsFooter from './boards-footer';
import { useBoards } from '@/hooks';

const Boards = () => {
  const [selectedBingoId, setSelectedBingoId] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const { data: bingos } = useBingos();
  const { data: boards, loading } = useBoardsByBingo(selectedBingoId);

  const {
    currentBoards,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    totalBoards,
  } = useBoards({
    boards,
    boardsPerPage: 50,
  });

  const bingosOptions = bingos?.map(bingo => ({
    value: bingo.id,
    label: bingo.title,
  }));

  useEffect(() => {
    if (bingos && bingos.length > 0 && !selectedBingoId) {
      setSelectedBingoId(bingos[0].id);
    }
  }, [bingos, selectedBingoId]);

  const handleSelect = (board: Board) => {
    if (board.status != BoardStatus.AVAILABLE ) {
      setIsOpen(true);
      setSelectedBoard(board);
    }
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Boletos" subtitle="Lista de Boletos" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6 gap-5">
        <div className="flex justify-between items-end w-full flex-col md:flex-row gap-3 md:gap-0">
          <div className="w-full md:w-[25%]">
            <Select
              options={bingosOptions}
              label="Selecciona un bingo"
              value={selectedBingoId}
              onChange={setSelectedBingoId}
              size="md"
              placeholder="Elige un bingo..."
            />
          </div>
          <div className="w-full md:w-[25%]">
            <Input
              icon="search"
              iconPosition="left"
              placeholder="Buscar boleto"
              inputSize="md"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <BoardsGrid
          boards={currentBoards}
          loading={loading}
          onSelect={handleSelect}
          search={search}
        />

        <BoardsFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalBoards={totalBoards}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
      </div>
      <BoardDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        board={selectedBoard}
      />
    </div>
  );
};

export default Boards;
