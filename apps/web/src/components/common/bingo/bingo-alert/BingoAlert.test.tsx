import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BingoAlert from './BingoAlert';

jest.mock('@riffy/components', () => ({
  Icon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="icon" data-name={name} className={className} />
  ),
}));

describe('<BingoAlert />', () => {
  const defaultProps = {
    message: 'Test message',
    icon: 'calendar',
    type: 'default' as const,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<BingoAlert {...defaultProps} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'calendar');
  });

  it('aplica estilos correctos para tipo success', () => {
    render(<BingoAlert {...defaultProps} type="success" />);

    const alertElement = document.querySelector('.bg-success-500\\/10');
    const textElement = screen.getByText('Test message');
    const iconElement = screen.getByTestId('icon');

    expect(alertElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-success-500');
    expect(iconElement).toHaveClass('text-success-500');
  });

  it('aplica estilos correctos para tipo error', () => {
    render(<BingoAlert {...defaultProps} type="error" />);

    const alertElement = document.querySelector('.bg-error-500\\/10');
    const textElement = screen.getByText('Test message');
    const iconElement = screen.getByTestId('icon');

    expect(alertElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-error-500');
    expect(iconElement).toHaveClass('text-error-500');
  });

  it('aplica estilos correctos para tipo warning', () => {
    render(<BingoAlert {...defaultProps} type="warning" />);

    const alertElement = document.querySelector('.bg-warning-500\\/10');
    const textElement = screen.getByText('Test message');
    const iconElement = screen.getByTestId('icon');

    expect(alertElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-warning-500');
    expect(iconElement).toHaveClass('text-warning-500');
  });

  it('aplica estilos correctos para tipo default', () => {
    render(<BingoAlert {...defaultProps} type="default" />);

    const alertElement = document.querySelector('.bg-box-secondary');
    const textElement = screen.getByText('Test message');
    const iconElement = screen.getByTestId('icon');

    expect(alertElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-body-100');
    expect(iconElement).toHaveClass('text-body-100');
  });

  it('muestra el mensaje correctamente', () => {
    render(<BingoAlert message="Custom message" icon="info" type="success" />);

    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });
});
