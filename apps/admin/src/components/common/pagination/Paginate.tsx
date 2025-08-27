import React from 'react';
import { Button, Icon } from '@riffy/components';

interface PaginateProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}

const Paginate: React.FC<PaginateProps> = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  gotoPage,
  previousPage,
  nextPage,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        disabled={!canPreviousPage}
        onClick={previousPage}
        className="w-9"
      >
        <Icon name="chevron-down" className="rotate-90 text-sm" />
      </Button>

      {Array.from({ length: pageCount }, (_, i) => (
        <Button
          variant={pageIndex === i ? 'primary' : 'default'}
          size="sm"
          key={i}
          onClick={() => gotoPage(i)}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant="default"
        size="sm"
        disabled={!canNextPage}
        onClick={nextPage}
        className="w-9"
      >
        <Icon name="chevron-down" className="-rotate-90 text-sm" />
      </Button>
    </div>
  );
};

export default Paginate;
