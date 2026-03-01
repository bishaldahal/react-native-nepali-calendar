import type { CalendarDate } from '../types';

/**
 * Compares two BS dates.
 *
 * @returns A negative number if `a` is before `b`, zero if they are equal,
 * and a positive number if `a` is after `b`.
 */
export function compareDates(a: CalendarDate, b: CalendarDate): number {
  if (a.bsYear !== b.bsYear) return a.bsYear - b.bsYear;
  if (a.bsMonth !== b.bsMonth) return a.bsMonth - b.bsMonth;
  return a.bsDay - b.bsDay;
}
