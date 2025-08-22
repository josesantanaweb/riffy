import { MIN_BET_AMOUNT } from '../number-input/NumberInput';

export function createActionButtons(
  disabled: boolean,
  maxValue: number,
  maxButtonClass: (isDisabled: boolean) => string,
  inputValue: string,
  handleMin: () => void,
  handleHalf: () => void,
  handleDouble: () => void,
  handleMinus: () => void,
  handlePlus: () => void,
) {
  return [
    {
      key: 'min',
      className: maxButtonClass(disabled),
      onClick: handleMin,
      disabled: disabled,
      label: 'Min',
    },
    {
      key: 'half',
      className: maxButtonClass(disabled || parseFloat(inputValue) <= 0),
      onClick: handleHalf,
      disabled: disabled || parseFloat(inputValue) <= 0,
      label: '1/2',
    },
    {
      key: 'double',
      className: maxButtonClass(disabled || parseFloat(inputValue) <= 0),
      onClick: handleDouble,
      disabled: disabled || parseFloat(inputValue) <= 0,
      label: 'x2',
    },
    {
      key: 'minus',
      className: maxButtonClass(parseFloat(inputValue) <= MIN_BET_AMOUNT),
      onClick: handleMinus,
      disabled: parseFloat(inputValue) <= MIN_BET_AMOUNT,
      label: '',
      icon: 'minus',
    },
    {
      key: 'plus',
      className: maxButtonClass(parseFloat(inputValue) >= maxValue),
      onClick: handlePlus,
      disabled: parseFloat(inputValue) >= maxValue,
      label: '',
      icon: 'plus',
    },
  ];
}
