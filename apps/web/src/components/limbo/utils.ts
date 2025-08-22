import { ResultEnum } from '@/types';

export const getResultTextColor = (value: ResultEnum | null) => {
  switch (value) {
    case ResultEnum.WIN:
      return 'text-green-500';
    case ResultEnum.LOSE:
      return 'text-red-500';
    default:
      return 'text-white';
  }
};
