/**
 * Formatea una fecha incluyendo día, mes abreviado y hora en formato 12 horas
 * @param dateString Fecha en formato string, Date o number
 * @returns String formateado con fecha y hora (ej: "04 Dic, 00:11 pm")
 */
export const formatDateTime = (dateString: string | Date | number): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return String(dateString);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
  };
  const formattedDate = date.toLocaleDateString('es-ES', dateOptions);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const hours12 = hours === 0 ? 0 : hours === 12 ? 0 : hours > 12 ? hours - 12 : hours;
  const formattedTime = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

  const parts = formattedDate.split(' ');
  const day = parts[0] || '';
  const monthPart = parts[1];

  if (!monthPart) {
    return `${formattedDate}, ${formattedTime}`;
  }

  const month = monthPart.charAt(0).toUpperCase() + monthPart.slice(1).toLowerCase();

  const cleanMonth = month.replace('.', '');

  return `${day} ${cleanMonth}, ${formattedTime}`;
};

