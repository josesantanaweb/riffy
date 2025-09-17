import { Icon } from '@riffy/components';
import { SortOrder } from '@/types';

interface TicketsHeaderProps {
  sortOrder: SortOrder;
  onSort: () => void;
}

const TicketsHeader = ({
  sortOrder,
  onSort,
}: TicketsHeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <Icon name="shuffle" className="text-xl text-base-300" />
      <h2 className="text-base font-medium text-white">Modo Aleatorio</h2>
    </div>
    <button
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      onClick={onSort}
    >
      <h2 className="text-base font-medium text-white">Ordenar:</h2>
      <Icon
        name="sort"
        className={`text-xl text-base-300 transition-transform ${
          sortOrder === 'desc' ? 'rotate-180' : ''
        }`}
      />
    </button>
  </div>
);

export default TicketsHeader
