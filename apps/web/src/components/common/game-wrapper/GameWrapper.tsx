'use client';
import GameFooter from '@/components/common/game-footer';

interface GameWrapperProps {
  children: React.ReactNode;
}

const GameWrapper = ({ children}: GameWrapperProps): React.ReactElement => {
  return (
    <div className="flex flex-col relative w-full">
      <div className="flex flex-col bg-base-800 p-5 w-full rounded-t-xl relative">
        {children}
      </div>
      <GameFooter />
    </div>
  );
};

export default GameWrapper;
