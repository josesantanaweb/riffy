'use client';
import React from 'react';
import type { ReactElement } from 'react';

interface BoardTitleProps {
  isRandomBoards: boolean;
}

const BoardTitle = ({ isRandomBoards }: BoardTitleProps): ReactElement => {
  const title = isRandomBoards ? 'Número de Boards' : 'Lista de Boards';
  const subtitle = isRandomBoards ? 'Seleccione la cantidad de boards' : 'Seleccione los números de la rifa';

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
