'use client';

interface SlideItemProp {
  slide: {
    id: number;
    multiplier: number;
    color: string;
  };
}

const SlideItem = ({ slide }: SlideItemProp): React.ReactElement => {
  return (
    <div
      className={`flex items-center w-[86px] flex-shrink-0 rounded-lg h-[160px] text-white justify-center text-2xl font-bold ${slide.color}`}
    >
      X{slide.multiplier}
    </div>
  );
};

export default SlideItem;
