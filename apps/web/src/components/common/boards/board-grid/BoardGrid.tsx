import { Board, BoardStatus } from '@riffy/types';
import BoardButton from '../board-button';

interface BoardGridProps {
  boards: Board[];
  selectedBoards: string[];
  onBoardSelect: (board: Board) => void;
}

const BoardGrid = ({
  boards,
  selectedBoards,
  onBoardSelect,
}: BoardGridProps) => (
  <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-[300px] scrollbar-transparent">
    {boards.map(board => {
      const isSelected = selectedBoards.includes(board.id);
      const isNotAvailable =
        board.status === BoardStatus.SOLD ||
        board.status === BoardStatus.PREMIUM ||
        board.status === BoardStatus.WINNER

      return (
        <BoardButton
          key={board.id}
          board={board}
          isSelected={isSelected}
          isNotAvailable={isNotAvailable}
          onSelect={onBoardSelect}
        />
      );
    })}
  </div>
);

export default BoardGrid;
