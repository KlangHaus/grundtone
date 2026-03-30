/**
 * Formaterer et tal til en valuta string
 */
export const formatCurrency = (amount: number, currency = 'DKK'): string => {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formaterer et dato til dansk format
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

/**
 * Formaterer et telefonnummer til dansk format
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phone;
};
