import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import NumberInput from './NumberInput';

describe('<NumberInput />', () => {
  const mockSetValue = jest.fn();

  const defaultProps = {
    value: 5,
    setValue: mockSetValue,
    minValue: 1,
    maxValue: 10,
  };

  beforeEach(() => {
    mockSetValue.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<NumberInput {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('muestra el valor actual correctamente', () => {
    render(<NumberInput {...defaultProps} value={7} />);

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('incrementa el valor al hacer clic en el botón plus', () => {
    render(<NumberInput {...defaultProps} value={5} />);

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    fireEvent.click(plusButton);

    expect(mockSetValue).toHaveBeenCalledWith(6);
  });

  it('decrementa el valor al hacer clic en el botón minus', () => {
    render(<NumberInput {...defaultProps} value={5} />);

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];
    fireEvent.click(minusButton);

    expect(mockSetValue).toHaveBeenCalledWith(4);
  });

  it('no incrementa más allá del maxValue', () => {
    render(<NumberInput {...defaultProps} value={10} maxValue={10} />);

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    fireEvent.click(plusButton);

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('no decrementa por debajo del minValue', () => {
    render(<NumberInput {...defaultProps} value={1} minValue={1} />);

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];
    fireEvent.click(minusButton);

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('deshabilita el botón minus cuando el valor es igual al minValue', () => {
    render(<NumberInput {...defaultProps} value={1} minValue={1} />);

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];
    expect(minusButton).toBeDisabled();
  });

  it('deshabilita el botón plus cuando el valor es igual al maxValue', () => {
    render(<NumberInput {...defaultProps} value={10} maxValue={10} />);

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    expect(plusButton).toBeDisabled();
  });

  it('usa minValue por defecto de 1 cuando no se proporciona', () => {
    render(<NumberInput {...defaultProps} minValue={undefined} value={1} />);

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];
    expect(minusButton).toBeDisabled();
  });

  it('usa maxValue por defecto de 100 cuando no se proporciona', () => {
    render(<NumberInput {...defaultProps} maxValue={undefined} value={100} />);

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    expect(plusButton).toBeDisabled();
  });

  it('no llama a setValue cuando se hace clic en botones deshabilitados', () => {
    render(<NumberInput {...defaultProps} value={1} minValue={1} />);

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];
    fireEvent.click(minusButton);

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('llama a setValue cuando se hace clic en botones habilitados', () => {
    render(<NumberInput {...defaultProps} value={5} minValue={1} maxValue={10} />);

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];
    const plusButton = buttons[1];

    expect(minusButton).not.toBeDisabled();
    expect(plusButton).not.toBeDisabled();

    mockSetValue.mockClear();

    fireEvent.click(minusButton);
    expect(mockSetValue).toHaveBeenCalledWith(4);

    fireEvent.click(plusButton);
    expect(mockSetValue).toHaveBeenCalledWith(6);
  });
});
