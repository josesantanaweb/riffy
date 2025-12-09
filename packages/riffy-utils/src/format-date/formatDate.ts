export const formatDate = (dateString: string | Date | number): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return String(dateString);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  const formattedDate = date.toLocaleDateString('es-ES', dateOptions);

  const parts = formattedDate.split(' ');
  const day = parts[0] || '';
  const monthPart = parts[1];

  if (!monthPart) {
    return formattedDate;
  }

  const month = monthPart.charAt(0).toUpperCase() + monthPart.slice(1).toLowerCase();
  const cleanMonth = month.replace('.', '');

  return `${day} ${cleanMonth}`;
};
