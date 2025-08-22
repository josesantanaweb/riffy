import { Button } from '@riffy/components';
import { SlideEnum } from '@/types/common';

interface ISlideOption {
  type: SlideEnum;
  multiplier: number;
  bgColor: string;
}

interface SlideOptionsProps {
  disabled: boolean;
  type: SlideEnum | null;
  onClick: (type: SlideEnum, multiplier: number) => void;
}

const SlideOptions = ({
  disabled,
  type,
  onClick,
}: SlideOptionsProps) => {
  const options: ISlideOption[] = [
    { type: SlideEnum.BLACK, multiplier: 2, bgColor: 'bg-base-700' },
    { type: SlideEnum.VIOLET, multiplier: 14, bgColor: 'bg-primary-600' },
    { type: SlideEnum.RED, multiplier: 2, bgColor: 'bg-red-500' },
  ];

  const getClass = (optionType: SlideEnum) =>
    optionType === type ? 'bg-base-600' : '';


  return (
    <div className="flex items-center gap-3">
      {options.map(option => (
        <Button
          key={option.type}
          disabled={disabled}
          onClick={() => onClick(option.type, option.multiplier)}
          className={`${getClass(option.type)} text-base-100`}
          isFull
        >
          <span
            className={`w-4 h-4 rounded-full border border-white ${option.bgColor}`}
          />
          X{option.multiplier}
        </Button>
      ))}
    </div>
  );
};

export default SlideOptions;
