import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import QuickButtons from './QuickButtons';

describe('<QuickButtons />', () => {
  const mockSetBoardsQuantity = jest.fn();

  const defaultProps = {
    boardsQuantity: 1,
    setBoardsQuantity: mockSetBoardsQuantity,
    maxBoards: 100,
  };

  beforeEach(() => {
    mockSetBoardsQuantity.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<QuickButtons {...defaultProps} />);

    expect(screen.getByText('2 Boards')).toBeInTheDocument();
    expect(screen.getByText('5 Boards')).toBeInTheDocument();
    expect(screen.getByText('10 Boards')).toBeInTheDocument();
  });

  it('renderiza todos los botones rápidos', () => {
    render(<QuickButtons {...defaultProps} />);

    expect(screen.getByText('2 Boards')).toBeInTheDocument();
    expect(screen.getByText('5 Boards')).toBeInTheDocument();
    expect(screen.getByText('10 Boards')).toBeInTheDocument();
  });

  it('aplica la variante primary al botón seleccionado', () => {
    render(<QuickButtons {...defaultProps} boardsQuantity={5} />);

    const selectedButton = screen.getByText('5 Boards');
    expect(selectedButton).toBeInTheDocument();

    expect(selectedButton).not.toBeDisabled();
  });

  it('aplica la variante default a los botones no seleccionados', () => {
    render(<QuickButtons {...defaultProps} boardsQuantity={5} />);

    const button2 = screen.getByText('2 Boards');
    const button10 = screen.getByText('10 Boards');

    expect(button2).toBeInTheDocument();
    expect(button10).toBeInTheDocument();
  });

  it('llama a setBoardsQuantity con el valor correcto al hacer clic en cada botón', () => {
    render(<QuickButtons {...defaultProps} />);

    const button2 = screen.getByText('2 Boards');
    fireEvent.click(button2);
    expect(mockSetBoardsQuantity).toHaveBeenCalledWith(2);

    const button5 = screen.getByText('5 Boards');
    fireEvent.click(button5);
    expect(mockSetBoardsQuantity).toHaveBeenCalledWith(5);

    const button10 = screen.getByText('10 Boards');
    fireEvent.click(button10);
    expect(mockSetBoardsQuantity).toHaveBeenCalledWith(10);
  });

  it('deshabilita botones que exceden el maxBoards', () => {
    render(<QuickButtons {...defaultProps} maxBoards={3} />);

    const button2 = screen.getByText('2 Boards');
    const button5 = screen.getByText('5 Boards');
    const button10 = screen.getByText('10 Boards');

    expect(button2).not.toBeDisabled();
    expect(button5).toBeDisabled();
    expect(button10).toBeDisabled();
  });

  it('no deshabilita ningún botón cuando maxBoards es mayor que todos los valores', () => {
    render(<QuickButtons {...defaultProps} maxBoards={50} />);

    const button2 = screen.getByText('2 Boards');
    const button5 = screen.getByText('5 Boards');
    const button10 = screen.getByText('10 Boards');

    expect(button2).not.toBeDisabled();
    expect(button5).not.toBeDisabled();
    expect(button10).not.toBeDisabled();
  });

  it('no llama a setBoardsQuantity cuando se hace clic en botones deshabilitados', () => {
    render(<QuickButtons {...defaultProps} maxBoards={3} />);

    const button5 = screen.getByText('5 Boards');
    const button10 = screen.getByText('10 Boards');

    mockSetBoardsQuantity.mockClear();

    fireEvent.click(button5);
    fireEvent.click(button10);

    expect(mockSetBoardsQuantity).not.toHaveBeenCalled();
  });

  it('usa maxBoards por defecto de 100 cuando no se proporciona', () => {
    render(<QuickButtons {...defaultProps} maxBoards={undefined} />);

    const button2 = screen.getByText('2 Boards');
    const button5 = screen.getByText('5 Boards');
    const button10 = screen.getByText('10 Boards');

    expect(button2).not.toBeDisabled();
    expect(button5).not.toBeDisabled();
    expect(button10).not.toBeDisabled();
  });
});
