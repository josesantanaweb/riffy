import { Icon } from '@riffy/components';
import { SortOrder } from '@/types';

interface TicketGridFilterProps {
  sortOrder: SortOrder;
  onSort: () => void;
  isRandomTickets: boolean;
  setIsRandomTickets: (isRandomTickets: boolean) => void;
}

const TicketGridFilter = ({
  sortOrder,
  onSort,
  isRandomTickets,
  setIsRandomTickets,
}: TicketGridFilterProps) => (
  <div className="flex items-center justify-between mb-3">
    <button
      className="flex items-center gap-2 p-2 rounded-md cursor-pointer"
      onClick={() => setIsRandomTickets(!isRandomTickets)}
    >
      <Icon name="shuffle" className="text-xl text-body-100" />
      <h2 className="text-base font-medium text-title">
        {isRandomTickets ? 'Modo Manual' : 'Modo Aleatorio'}
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

export default TicketGridFilter;
