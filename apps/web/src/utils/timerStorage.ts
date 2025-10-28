const TIMER_KEY = 'payment-timer';
const TIMER_DURATION = 5 * 60;

interface TimerData {
  timeLeft: number;
  timestamp: number;
}

export const loadTimerFromStorage = (): number => {
  if (typeof window === 'undefined') return TIMER_DURATION;

  try {
    const savedTimer = localStorage.getItem(TIMER_KEY);
    if (savedTimer) {
      const { timeLeft: savedTime, timestamp } = JSON.parse(savedTimer) as TimerData;
      const elapsed = Math.floor((Date.now() - timestamp) / 1000);
      const remainingTime = savedTime - elapsed;

      if (remainingTime > 0) {
        return remainingTime;
      }
    }
  } catch {
    //
  }

  return TIMER_DURATION;
};

export const saveTimerToStorage = (time: number): void => {
  if (typeof window === 'undefined') return;

  try {
    const timerData: TimerData = {
      timeLeft: time,
      timestamp: Date.now()
    };
    localStorage.setItem(TIMER_KEY, JSON.stringify(timerData));
  } catch {
    //
  }
};

export const removeTimerFromStorage = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(TIMER_KEY);
  } catch {
    //
  }
};

export const getTimerDuration = (): number => TIMER_DURATION;

