// ─── Component ───────────────────────────────────────────────
export { NepaliCalendar } from './components/NepaliCalendar';

// ─── Types ───────────────────────────────────────────────────
export type {
  CalendarAccessibility,
  CalendarDate,
  CalendarLocale,
  CalendarMonth,
  CalendarNumeral,
  CalendarSelectionMode,
  CalendarStyles,
  CalendarTheme,
  MarkedDate,
  NepaliCalendarProps,
  RenderDayParams,
  RenderHeaderParams,
} from './types';

// ─── Utilities ───────────────────────────────────────────────
export { adToBs } from './utils/adToBs';
export { bsToAd } from './utils/bsToAd';
export { compareDates } from './utils/compareDates';
export { formatBsDate } from './utils/formatBsDate';
export type { FormatBsDateOptions } from './utils/formatBsDate';
export { isSameDate } from './utils/isSameDate';
export { isDateInRange } from './utils/isDateInRange';
export { isValidBsDate } from './utils/validation';
export { generateMonthMatrix } from './utils/generateMonthMatrix';
export type {
  MonthMatrixCell,
  MonthMatrixRow,
} from './utils/generateMonthMatrix';

// ─── Locale ──────────────────────────────────────────────────
export { getLocale, toLocalNumeral } from './locale';
export type { LocaleData } from './locale';
