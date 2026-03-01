import type { CalendarDate, CalendarLocale, CalendarNumeral } from '../types';
import { getLocale, toLocalNumeral } from '../locale';

export type FormatBsDateOptions = {
  /** Locale for month names. Default: `'en'`. */
  locale?: CalendarLocale;
  /** Numeral system for year/day numbers. Default: `'en'`. */
  numeral?: CalendarNumeral;
  /**
   * Format pattern:
   * - `'full'`: "15 Baisakh, 2082" / "१५ बैशाख, २०८२"
   * - `'short'`: "2082/01/15" / "२०८२/०१/१५"
   * - `'monthYear'`: "Baisakh 2082" / "बैशाख २०८२"
   *
   * Default: `'full'`.
   */
  format?: 'full' | 'short' | 'monthYear';
};

/**
 * Formats a BS date as a human-readable string.
 *
 * @param date - The BS date to format.
 * @param options - Formatting options.
 * @returns A formatted date string.
 */
export function formatBsDate(
  date: CalendarDate,
  options?: FormatBsDateOptions
): string {
  const locale = options?.locale ?? 'en';
  const numeral = options?.numeral ?? 'en';
  const format = options?.format ?? 'full';
  const localeData = getLocale(locale);

  const monthName = localeData.months[date.bsMonth - 1] ?? '';
  const year = toLocalNumeral(date.bsYear, numeral);
  const day = toLocalNumeral(date.bsDay, numeral);

  switch (format) {
    case 'full':
      return `${day} ${monthName}, ${year}`;
    case 'short': {
      const month = toLocalNumeral(date.bsMonth, numeral).padStart(2, '0');
      const dayPadded = toLocalNumeral(date.bsDay, numeral).padStart(2, '0');
      return `${year}/${month}/${dayPadded}`;
    }
    case 'monthYear':
      return `${monthName} ${year}`;
  }
}
