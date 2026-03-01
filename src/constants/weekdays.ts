/**
 * Weekday labels in English and Nepali.
 *
 * Index 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
 * This matches the JavaScript Date.getDay() convention.
 */

/** Full weekday names in English. */
export const WEEKDAYS_EN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/** Short weekday names in English. */
export const WEEKDAYS_SHORT_EN = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
] as const;

/** Full weekday names in Nepali. */
export const WEEKDAYS_NE = [
  'आइतबार',
  'सोमबार',
  'मंगलबार',
  'बुधबार',
  'बिहिबार',
  'शुक्रबार',
  'शनिबार',
] as const;

/** Short weekday names in Nepali. */
export const WEEKDAYS_SHORT_NE = [
  'आइत',
  'सोम',
  'मंगल',
  'बुध',
  'बिहि',
  'शुक्र',
  'शनि',
] as const;
