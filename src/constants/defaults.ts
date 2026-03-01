import type {
  CalendarLocale,
  CalendarNumeral,
  CalendarSelectionMode,
} from '../types';

/**
 * Default prop values for the NepaliCalendar component.
 */
export const CALENDAR_DEFAULTS = {
  locale: 'en' as CalendarLocale,
  numeral: 'en' as CalendarNumeral,
  selectionMode: 'single' as CalendarSelectionMode,
  weekStartsOn: 0 as 0 | 1 | 6,
  showHeader: true,
  showWeekdays: true,
  showAdjacentMonths: false,
  showTodayHighlight: true,
  testID: 'nepali-calendar',
  dayTestIDPrefix: 'calendar-day',
} as const;
