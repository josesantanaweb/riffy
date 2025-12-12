import { Icon } from '@riffy/components';
import { SortOrder } from '@/types';

interface TicketGridFilterProps {
  sortOrder: SortOrder;
  onSort: () => void;
  isRandomTickets: boolean;
  setIsRandomTickets?: (isRandomTickets: boolean) => void;
  canToggle?: boolean;
}

const TicketGridFilter = ({
  sortOrder,
  onSort,
  isRandomTickets,
  setIsRandomTickets,
  canToggle = true,
}: TicketGridFilterProps) => (
  <div className="flex items-center justify-between">
    {canToggle && setIsRandomTickets ? (
      <button
        className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors"
        onClick={() => setIsRandomTickets(!isRandomTickets)}
      >
        <Icon name="shuffle" className="text-xl text-body-100" />
        <h2 className="text-base font-medium text-title">
          {isRandomTickets ? 'Modo Manual' : 'Modo Aleatorio'}
        </h2>
      </button>
    ) : (
      <div className="flex items-center gap-2 p-2">
        <Icon name={isRandomTickets ? "shuffle" : "ticket"} className="text-xl text-body-100" />
        <h2 className="text-base font-medium text-title">
          {isRandomTickets ? 'Modo Aleatorio' : 'Modo Manual'}
        </h2>
      </div>
    )}
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
