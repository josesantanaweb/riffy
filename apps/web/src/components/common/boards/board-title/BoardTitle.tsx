'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface BoardTitleProps {
  isRandomBoards: boolean;
}

const BoardTitle = ({ isRandomBoards }: BoardTitleProps): ReactElement => {
  const title = isRandomBoards ? 'Número de Cartones' : 'Lista de Cartones';
  const subtitle = isRandomBoards ? 'Seleccione la cantidad de cartones' : 'Seleccione los números de la bingo';

  return (
    <div className="flex flex-col gap-1 my-3">
      <h2 className="text-lg font-semibold text-title">
        {title}
      </h2>
      <p className="text-sm text-body-100">
        {subtitle}
      </p>
    </div>
  );
};

export default BoardTitle;
