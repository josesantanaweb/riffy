import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BingoProgress from './BingoProgress';
import { BingoStatus } from '@riffy/types';

jest.mock('@riffy/components', () => ({
  ProgressBar: ({ progress }: { progress: number }) => (
    <div data-testid="progress-bar" data-progress={progress}>
      Progress: {progress}%
    </div>
  ),
}));

describe('<BingoProgress />', () => {
  const mockBingo = {
    id: '1',
    title: 'Test Bingo',
    description: 'Test description',
    banner: 'https://example.com/banner.jpg',
    totalBoards: 2000,
    award: 10000,
    price: 5,
    showDate: true,
    showProgress: true,
    minBoards: 1,
    drawDate: '2024-12-31',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    sold: 1500,
    available: 500,
    progress: 75,
    owner: null,
    status: BingoStatus.ACTIVE,
  };

  it('renderiza correctamente con bingo activa', () => {
    render(<BingoProgress bingo={mockBingo} />);

    expect(screen.getByText('75% Completado')).toBeInTheDocument();
    expect(screen.getByText('1,500/2,000')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toHaveAttribute('data-progress', '75');
  });

  it('muestra progreso 100% cuando la rifa está completada', () => {
    const completedBingo = {
      ...mockBingo,
      status: BingoStatus.COMPLETED,
      progress: 75,
    };

    render(<BingoProgress bingo={completedBingo} />);

    expect(screen.getByText('100% Completado')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toHaveAttribute('data-progress', '100');
  });


  it('muestra estado de carga cuando loading es true', () => {
    render(<BingoProgress bingo={mockBingo} loading={true} />);

    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements).toHaveLength(1);

    expect(screen.queryByText('75% Completado')).not.toBeInTheDocument();
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });
});
