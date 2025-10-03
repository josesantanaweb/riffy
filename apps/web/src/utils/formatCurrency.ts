export type Currency = 'USD' | 'VES';

export const formatCurrency = (
  value: number,
  currency: Currency = 'USD'
): string => {
  const locale = currency === 'USD' ? 'en-US' : 'es-VE';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
