
import { format, addDays, isAfter, isBefore, isValid, parse } from 'date-fns';

export const formatDate = (date: Date | undefined, formatString: string = 'MMM dd, yyyy'): string => {
  if (!date || !isValid(date)) return '';
  return format(date, formatString);
};

export const parseDate = (dateString: string, formatString: string = 'yyyy-MM-dd'): Date | null => {
  try {
    const date = parse(dateString, formatString, new Date());
    return isValid(date) ? date : null;
  } catch (error) {
    return null;
  }
};

export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days);
};

export const isDateAfter = (date: Date, compareDate: Date): boolean => {
  return isAfter(date, compareDate);
};

export const isDateBefore = (date: Date, compareDate: Date): boolean => {
  return isBefore(date, compareDate);
};

export const getTomorrowDate = (): Date => {
  return addDays(new Date(), 1);
};

export const getNextWeekDate = (): Date => {
  return addDays(new Date(), 7);
};
