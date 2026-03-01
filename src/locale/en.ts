import { BS_MONTHS_EN } from '../constants/months';
import { WEEKDAYS_EN, WEEKDAYS_SHORT_EN } from '../constants/weekdays';

/** English numeral digits. */
const EN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

export const en = {
  months: BS_MONTHS_EN,
  weekdays: WEEKDAYS_EN,
  weekdaysShort: WEEKDAYS_SHORT_EN,
  digits: EN_DIGITS,
  today: 'Today',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  goToToday: 'Go to today',
} as const;
