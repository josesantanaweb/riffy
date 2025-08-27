import React from 'react';

interface PaginationInfoProps {
  pageIndex: number;
  pageSize: number;
  rows: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
  pageIndex,
  pageSize,
  rows,
}) => {
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, rows);
  return (
    <p className="text-white text-sm">
      Mostrando {start} a {end} de {rows} resultados
    </p>
  );
};

export default PaginationInfo;
