import type { CalendarDate, MarkedDate } from '../../types';
import { adToBs } from '../../utils/adToBs';
import { compareDates } from '../../utils/compareDates';
import { isSameDate } from '../../utils/isSameDate';
import { isDateInRange } from '../../utils/isDateInRange';
import { dateKey } from '../../utils/keys';

export type DayState = {
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isMarked: boolean;
  isOutsideMonth: boolean;
  markedDate: MarkedDate | undefined;
};

/**
 * Returns today's date in BS.
 * Cached per-render via the caller (not internally memoized here).
 */
export function getTodayBs(): CalendarDate {
  return adToBs(new Date());
}

/**
 * Builds a lookup map from marked dates for O(1) access.
 */
export function buildMarkedDatesMap(
  markedDates: MarkedDate[] | undefined
): Map<string, MarkedDate> {
  const map = new Map<string, MarkedDate>();
  if (markedDates) {
    for (const md of markedDates) {
      map.set(dateKey(md.date), md);
    }
  }
  return map;
}

/**
 * Computes the full state flags for a given day cell.
 */
export function computeDayState(params: {
  date: CalendarDate;
  visibleMonth: { bsYear: number; bsMonth: number };
  selectedDate: CalendarDate | undefined;
  today: CalendarDate;
  markedDatesMap: Map<string, MarkedDate>;
  minDate: CalendarDate | undefined;
  maxDate: CalendarDate | undefined;
  disabled: boolean;
  disablePastDates: boolean;
  disableFutureDates: boolean;
  disabledDates: CalendarDate[] | undefined;
  isDateDisabledFn: ((date: CalendarDate) => boolean) | undefined;
}): DayState {
  const {
    date,
    visibleMonth,
    selectedDate,
    today,
    markedDatesMap,
    minDate,
    maxDate,
    disabled: globalDisabled,
    disablePastDates,
    disableFutureDates,
    disabledDates,
    isDateDisabledFn,
  } = params;

  const isOutsideMonth =
    date.bsYear !== visibleMonth.bsYear ||
    date.bsMonth !== visibleMonth.bsMonth;

  const isSelected = selectedDate ? isSameDate(date, selectedDate) : false;
  const isToday = isSameDate(date, today);

  const key = dateKey(date);
  const markedDate = markedDatesMap.get(key);
  const isMarked = markedDate !== undefined;

  // Disabled logic — ordered by precedence.
  let isDisabled = false;

  if (globalDisabled) {
    isDisabled = true;
  } else if (!isDateInRange(date, minDate, maxDate)) {
    isDisabled = true;
  } else if (disablePastDates && compareDates(date, today) < 0) {
    isDisabled = true;
  } else if (disableFutureDates && compareDates(date, today) > 0) {
    isDisabled = true;
  } else if (disabledDates?.some((d) => isSameDate(d, date))) {
    isDisabled = true;
  } else if (isDateDisabledFn?.(date)) {
    isDisabled = true;
  } else if (markedDate?.disabled) {
    isDisabled = true;
  }

  return {
    isSelected,
    isToday,
    isDisabled,
    isMarked,
    isOutsideMonth,
    markedDate,
  };
}
