import { Button } from '@riffy/components';
import { RockPaperScissorsEnum } from '@/types/common';

interface ISlideOption {
  type: RockPaperScissorsEnum;
  icon: string;
}

interface RockPaperScissorsOptionsProps {
  disabled: boolean;
  type: RockPaperScissorsEnum | null;
  onClick: (type: RockPaperScissorsEnum) => void;
}

const RockPaperScissorsOptions = ({
  disabled,
  type,
  onClick,
}: RockPaperScissorsOptionsProps) => {
  const options: ISlideOption[] = [
    { type: RockPaperScissorsEnum.ROCK, icon: 'icon-rock' },
    { type: RockPaperScissorsEnum.PAPER, icon: 'icon-paper' },
    { type: RockPaperScissorsEnum.SCISSORS, icon: 'icon-scissors' },
  ];

  const getClass = (optionType: RockPaperScissorsEnum) =>
    optionType === type ? 'bg-base-600' : '';

  return (
    <div className="flex items-center gap-3">
      {options.map(option => (
        <Button
          key={option.type}
          disabled={disabled}
          onClick={() => onClick(option.type)}
          className={`${getClass(option.type)} text-base-100`}
          isFull
        >
          <span className={`${option.icon} text-xl`} />
        </Button>
      ))}
    </div>
  );
};

export default RockPaperScissorsOptions;
