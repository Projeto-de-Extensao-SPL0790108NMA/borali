import { format } from 'date-fns';

const formatDateTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy h:mm a');
};

const formatDateToMMDDYYYY = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy');
  } catch {
    return dateString;
  }
};

export const dateUtils = {
  formatDateTime,
  formatDateToMMDDYYYY,
};
