import type { CalendarDate } from '../types';

/**
 * Returns `true` if two BS dates represent the same day.
 */
export function isSameDate(a: CalendarDate, b: CalendarDate): boolean {
  return (
    a.bsYear === b.bsYear && a.bsMonth === b.bsMonth && a.bsDay === b.bsDay
  );
}
