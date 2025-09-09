import React from 'react';
import PaginationInfo from './PaginationInfo';
import Paginate from './Paginate';

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  rows: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageSize,
  rows,
  pageCount,
  canPreviousPage,
  canNextPage,
  gotoPage,
  previousPage,
  nextPage,
}) => {
  return (
    <div className="flex w-full justify-between items-center">
      <PaginationInfo rows={rows} pageSize={pageSize} pageIndex={pageIndex} />

      <Paginate
        pageIndex={pageIndex}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default Pagination;
