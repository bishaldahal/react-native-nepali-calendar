import type { CalendarLocale, CalendarNumeral } from '../types';
import { en } from './en';
import { ne } from './ne';

export type LocaleData = {
  readonly months: readonly string[];
  readonly weekdays: readonly string[];
  readonly weekdaysShort: readonly string[];
  readonly digits: readonly string[];
  readonly today: string;
  readonly previousMonth: string;
  readonly nextMonth: string;
  readonly goToToday: string;
};

const locales: Record<CalendarLocale, LocaleData> = { en, ne };

/**
 * Returns locale data for the given locale key.
 */
export function getLocale(locale: CalendarLocale): LocaleData {
  return locales[locale];
}

/**
 * Converts a number to the specified numeral system string.
 *
 * @param num - The number to convert.
 * @param numeral - The target numeral system (`'en'` or `'ne'`).
 * @returns The number represented as a string in the given numeral system.
 */
export function toLocalNumeral(num: number, numeral: CalendarNumeral): string {
  const digits = locales[numeral].digits;
  return String(num)
    .split('')
    .map((ch) => {
      const digit = Number(ch);
      return Number.isNaN(digit) ? ch : digits[digit] ?? ch;
    })
    .join('');
}

export { en, ne };
