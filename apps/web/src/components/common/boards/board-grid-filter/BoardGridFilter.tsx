import { Icon } from '@riffy/components';
import { SortOrder } from '@/types';

interface BoardsHeaderProps {
  sortOrder: SortOrder;
  onSort: () => void;
  isRandomBoards: boolean;
  setIsRandomBoards: (isRandomBoards: boolean) => void;
}

const BoardsHeader = ({
  sortOrder,
  onSort,
  isRandomBoards,
  setIsRandomBoards,
}: BoardsHeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <button
      className="flex items-center gap-2 p-2 rounded-md cursor-pointer"
      onClick={() => setIsRandomBoards(!isRandomBoards)}
    >
      <Icon name="shuffle" className="text-xl text-body-100" />
      <h2 className="text-base font-medium text-title">
        {isRandomBoards ? 'Modo Aleatorio' : 'Modo Manual'}
      </h2>
    </button>
    {!isRandomBoards && (
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

export default BoardsHeader;
