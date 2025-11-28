'use client';
import { Board, BoardStatus } from '@riffy/types';

interface BoardBoxProps {
  board: Board;
  onSelect: (board: Board) => void;
}

const BoardBox = ({ board, onSelect }: BoardBoxProps) => {
  const getStatusColor = (status: BoardStatus) => {
    switch (status) {
      case BoardStatus.AVAILABLE:
        return 'bg-box-secondary text-body-100';
      case BoardStatus.SOLD:
        return 'box-secondary text-body-100 line-through';
      case BoardStatus.WINNER:
        return 'bg-success-500/70 text-white';
      case BoardStatus.LOSER:
        return 'bg-danger-500/70 text-white';
      case BoardStatus.PREMIUM:
        return 'bg-box-primary text-white';
      default:
        return 'text-white';
    }
  };

  return (
    <div
      key={board.id}
      className={`h-12 flex items-center text-base font-medium justify-center rounded-md p-2 cursor-pointer transition-colors ${getStatusColor(board.status as BoardStatus)}`}
      onClick={() => onSelect(board)}
    >
      {board.number}
    </div>
  );
};

export default BoardBox;
