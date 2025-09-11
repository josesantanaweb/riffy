export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const day = date.getDate();
  const month = date.toLocaleDateString('es-ES', { month: 'short' });
  const year = date.getFullYear();

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} ${capitalizedMonth} ${year}`;
};
