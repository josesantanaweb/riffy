import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from './Search';
import { Input } from '@riffy/components';

jest.mock('@riffy/components', () => ({
  Input: jest.fn(),
}));

describe('<Search />', () => {
  const mockOnClick = jest.fn();
  const mockOnChange = jest.fn();
  const mockInput = jest.fn();

  const defaultProps = {
    placeholder: 'Test placeholder',
    isRequired: true,
    value: '1234567890',
    error: 'Test error',
    loading: false,
    onClick: mockOnClick,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockInput.mockImplementation(({ onIconClick, onKeyDown, onChange, icon }) => (
      <div>
        <input data-testid="input" onKeyDown={onKeyDown} onChange={onChange} />
        <button data-testid="icon-button" onClick={onIconClick}>{icon}</button>
      </div>
    ));

    (Input as jest.MockedFunction<typeof Input>).mockImplementation(mockInput);
  });

  it('renderiza correctamente', () => {
    render(<Search {...defaultProps} />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('muestra icono de búsqueda cuando no está cargando', () => {
    render(<Search {...defaultProps} loading={false} />);
    expect(screen.getByText('search')).toBeInTheDocument();
  });

  it('muestra spinner cuando está cargando', () => {
    render(<Search {...defaultProps} loading={true} />);

    const spinnerElement = document.querySelector('.animate-spin');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('ejecuta onClick cuando se hace click en el icono', () => {
    render(<Search {...defaultProps} />);

    const iconButton = screen.getByTestId('icon-button');
    fireEvent.click(iconButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('ejecuta onClick cuando se presiona Enter', () => {
    render(<Search {...defaultProps} />);

    const inputElement = screen.getByTestId('input');
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick cuando se presiona Enter y está cargando', () => {
    render(<Search {...defaultProps} loading={true} />);

    const inputElement = screen.getByTestId('input');
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('ejecuta onChange cuando cambia el valor del input', () => {
    render(<Search {...defaultProps} />);

    const inputElement = screen.getByTestId('input');
    fireEvent.change(inputElement, { target: { value: 'nuevo valor' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
