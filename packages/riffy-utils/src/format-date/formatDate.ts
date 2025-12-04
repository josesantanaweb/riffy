import { format } from '@formkit/tempo';

export const formatDate = (dateString: string | Date | number): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return String(dateString);
  }

  return format(date, 'D MM', 'es-ES');
};
