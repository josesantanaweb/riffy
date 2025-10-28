import { Icon } from '@riffy/components';
import { cn } from '@/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalTickets: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalTickets,
  onPrevPage,
  onNextPage,
}: PaginationProps) => {
  const BUTTON_STYLES = {
    base: 'gap-2 bg-box-secondary rounded-md p-2 w-10 h-10 flex items-center justify-center transition-colors',
    disabled: 'opacity-50 cursor-not-allowed text-body-100',
    enabled: 'hover:bg-primary-500 text-white',
  } as const;

  const getButtonStyles = (isDisabled: boolean, rotation: string) => {
    const buttonStyles = {
      base: BUTTON_STYLES.base,
      state: isDisabled ? BUTTON_STYLES.disabled : BUTTON_STYLES.enabled,
      rotation: rotation,
    };

    return cn(buttonStyles.base, buttonStyles.state, buttonStyles.rotation);
  };

  return (
    <div className="flex items-center justify-between gap-5 w-full md:w-auto">
      <div className="flex items-center gap-5">
        <span className="text-body-100 text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <span className="font-medium text-primary-500 text-sm">
          Total: {totalTickets}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className={getButtonStyles(currentPage === 1, 'rotate-90')}
        >
          <Icon name="chevron-down" className="text-xl" />
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={getButtonStyles(currentPage === totalPages, '-rotate-90')}
        >
          <Icon name="chevron-down" className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Pagination
