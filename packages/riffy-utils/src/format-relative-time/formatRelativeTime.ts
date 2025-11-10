import {
  diffSeconds,
  diffMinutes,
  diffHours,
  diffDays,
  diffWeeks,
  diffMonths,
  diffYears,
} from '@formkit/tempo';

export const formatRelativeTime = (date: string | Date | number): string => {
  const now = new Date();
  const targetDate = new Date(date);

  const seconds = Math.abs(diffSeconds(targetDate, now));
  const minutes = Math.abs(diffMinutes(targetDate, now));
  const hours = Math.abs(diffHours(targetDate, now));
  const days = Math.abs(diffDays(targetDate, now));
  const weeks = Math.abs(diffWeeks(targetDate, now));
  const months = Math.abs(diffMonths(targetDate, now));
  const years = Math.abs(diffYears(targetDate, now));

  if (seconds < 60) {
    return 'ahora';
  } else if (minutes < 60) {
    return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  } else if (hours < 24) {
    return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  } else if (days < 7) {
    return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
  } else if (weeks < 4) {
    return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  } else if (months < 12) {
    return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else {
    return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }
};
