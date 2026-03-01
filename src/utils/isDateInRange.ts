import type { CalendarDate } from '../types';
import { compareDates } from './compareDates';

/**
 * Returns `true` if the given date falls within the specified range (inclusive).
 *
 * @param date - The date to check.
 * @param minDate - Optional lower bound (inclusive).
 * @param maxDate - Optional upper bound (inclusive).
 */
export function isDateInRange(
  date: CalendarDate,
  minDate?: CalendarDate,
  maxDate?: CalendarDate
): boolean {
  if (minDate && compareDates(date, minDate) < 0) return false;
  if (maxDate && compareDates(date, maxDate) > 0) return false;
  return true;
}
