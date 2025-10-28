import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ProgressBar from './ProgressBar';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      animate,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
      animate?: { width?: string };
      [key: string]: unknown;
    }) => (
      <div className={className} style={{ width: animate?.width }} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('<ProgressBar />', () => {
  const defaultProps = {
    progress: 50,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBarElement = screen.getByTestId('progress-bar');
    expect(progressBarElement).toBeInTheDocument();
    expect(progressBarElement).toHaveClass(
      'w-full',
      'h-[15px]',
      'bg-box-secondary',
      'rounded-full',
    );
  });

  it('muestra el progreso correctamente', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBarElement = screen.getByTestId('progress-bar');
    const progressFill = progressBarElement.querySelector('div');

    expect(progressFill).toHaveStyle('width: 50.00%');
    expect(progressFill).toHaveClass('bg-primary-500');
  });
});
