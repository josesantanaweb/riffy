import { Icon } from '@riffy/components';
import { SortOrder } from '@/types';

interface TicketsHeaderProps {
  sortOrder: SortOrder;
  onSort: () => void;
  isRandomTickets: boolean;
  setIsRandomTickets: (isRandomTickets: boolean) => void;
}

const TicketsHeader = ({
  sortOrder,
  onSort,
  isRandomTickets,
  setIsRandomTickets,
}: TicketsHeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <button
      className="flex items-center gap-2 p-2 rounded-md cursor-pointer"
      onClick={() => setIsRandomTickets(!isRandomTickets)}
    >
      <Icon name="shuffle" className="text-xl text-body-100" />
      <h2 className="text-base font-medium text-title">
        {isRandomTickets ? 'Modo Aleatorio' : 'Modo Manual'}
      </h2>
    </button>
    {!isRandomTickets && (
      <button
        className="flex items-center gap-2"
        onClick={onSort}
      >
        <h2 className="text-base font-medium text-title">
          Ordenar:
        </h2>
        <Icon
          name="sort"
          className={`text-xl text-body-100 transition-transform ${
            sortOrder === 'desc' ? 'rotate-180' : ''
          }`}
        />
      </button>
    )}
  </div>
);

export default TicketsHeader;
