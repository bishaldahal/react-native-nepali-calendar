import type { CalendarDate } from '../types';

/**
 * Generates a unique string key for a BS date.
 *
 * Useful as React list keys and for lookups in maps/sets.
 *
 * @example
 * dateKey({ bsYear: 2082, bsMonth: 1, bsDay: 15 }) // "2082-01-15"
 */
export function dateKey(date: CalendarDate): string {
  const m = String(date.bsMonth).padStart(2, '0');
  const d = String(date.bsDay).padStart(2, '0');
  return `${date.bsYear}-${m}-${d}`;
}

/**
 * Generates a test ID for a day cell.
 *
 * @param prefix - The testID prefix (e.g. "calendar-day").
 * @param date - The BS date.
 */
export function dayTestID(prefix: string, date: CalendarDate): string {
  return `${prefix}-${dateKey(date)}`;
}
