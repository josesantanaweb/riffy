import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';

import { ROUTES } from '@/constants';
import * as timerStorage from '@/utils';
import PaymentTimer from './PaymentTimer';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@riffy/utils', () => ({
  formatTime: jest.fn((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }),
  cn: jest.fn((...inputs: unknown[]) => {
    return inputs.filter(Boolean).join(' ');
  }),
}));

jest.mock('../../../utils', () => ({
  loadTimerFromStorage: jest.fn(() => 300),
  saveTimerToStorage: jest.fn(),
  removeTimerFromStorage: jest.fn(),
  getTimerDuration: jest.fn(() => 300),
}));

describe('<Timer />', () => {
  const mockSaveTimerToStorage = timerStorage.saveTimerToStorage as jest.MockedFunction<typeof timerStorage.saveTimerToStorage>;
  const mockRemoveTimerFromStorage = timerStorage.removeTimerFromStorage as jest.MockedFunction<typeof timerStorage.removeTimerFromStorage>;
  const mockLoadTimerFromStorage = timerStorage.loadTimerFromStorage as jest.MockedFunction<typeof timerStorage.loadTimerFromStorage>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockLoadTimerFromStorage.mockReturnValue(300);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('muestra el tiempo correctamente', () => {
    render(<PaymentTimer />);

    const timerText = screen.getByText(/05:00/);
    expect(timerText).toBeInTheDocument();
  });

  it('redirige cuando el tiempo llega a 0', async () => {
    mockLoadTimerFromStorage.mockReturnValue(2);

    render(<PaymentTimer />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSaveTimerToStorage).toHaveBeenCalledWith(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(mockRemoveTimerFromStorage).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith(ROUTES.BINGOS.LIST);
    });
  });

  it('guarda el tiempo en localStorage mientras cuenta regresiva', () => {
    mockLoadTimerFromStorage.mockReturnValue(5);

    render(<PaymentTimer />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockSaveTimerToStorage).toHaveBeenCalledTimes(2);
    expect(mockSaveTimerToStorage).toHaveBeenNthCalledWith(1, 4);
    expect(mockSaveTimerToStorage).toHaveBeenNthCalledWith(2, 3);
  });
});
