import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PageHeader from './PageHeader';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('../payment-timer', () => ({
  __esModule: true,
  default: () => <div data-testid="payment-timer">Timer</div>,
}));

describe('<PageHeader />', () => {
  const defaultProps = {
    title: 'Test Page Header',
    showTimer: false,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<PageHeader {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test page header/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('muestra el timer cuando showTimer es true', () => {
    render(<PageHeader {...defaultProps} showTimer={true} />);

    const timerElement = screen.getByTestId('payment-timer');
    expect(timerElement).toBeInTheDocument();
  });

  it('no muestra el timer cuando showTimer es false', () => {
    render(<PageHeader {...defaultProps} showTimer={false} />);

    const timerElement = screen.queryByTestId('payment-timer');
    expect(timerElement).not.toBeInTheDocument();
  });
});
