import { useCallback, useRef } from 'react';
import type { CalendarDate, CalendarMonth } from '../types';
import { adToBs } from '../utils/adToBs';
import { BS_EPOCH_YEAR, BS_MAX_YEAR } from '../utils/bsData';
import { getNextMonth, getPreviousMonth } from '../utils/generateMonthMatrix';
import { isDateInRange } from '../utils/isDateInRange';
import { useControllableState } from './useControllableState';

export type UseVisibleMonthOptions = {
  visibleMonth?: CalendarMonth;
  defaultVisibleMonth?: CalendarMonth;
  onVisibleMonthChange?: (month: CalendarMonth) => void;
  selectedDate?: CalendarDate;
  defaultSelectedDate?: CalendarDate;
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
};

export type UseVisibleMonthResult = {
  currentMonth: CalendarMonth;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  canGoToPreviousMonth: boolean;
  canGoToNextMonth: boolean;
};

/**
 * Derives the initial visible month from props, falling back to
 * the selected date, default selected date, or the current BS month.
 */
function deriveInitialMonth(
  defaultVisibleMonth?: CalendarMonth,
  selectedDate?: CalendarDate,
  defaultSelectedDate?: CalendarDate
): CalendarMonth {
  if (defaultVisibleMonth) {
    return defaultVisibleMonth;
  }
  if (selectedDate) {
    return { bsYear: selectedDate.bsYear, bsMonth: selectedDate.bsMonth };
  }
  if (defaultSelectedDate) {
    return {
      bsYear: defaultSelectedDate.bsYear,
      bsMonth: defaultSelectedDate.bsMonth,
    };
  }
  // Fall back to current date.
  const today = adToBs(new Date());
  return { bsYear: today.bsYear, bsMonth: today.bsMonth };
}

/**
 * Hook that manages the visible month state for the calendar,
 * including navigation constraints and controlled/uncontrolled support.
 */
export function useVisibleMonth(
  options: UseVisibleMonthOptions
): UseVisibleMonthResult {
  const {
    visibleMonth: controlledMonth,
    defaultVisibleMonth,
    onVisibleMonthChange,
    selectedDate,
    defaultSelectedDate,
    minDate,
    maxDate,
  } = options;

  const initialMonth = useRef(
    deriveInitialMonth(defaultVisibleMonth, selectedDate, defaultSelectedDate)
  ).current;

  const [currentMonth, setCurrentMonth] = useControllableState<CalendarMonth>(
    controlledMonth,
    initialMonth,
    onVisibleMonthChange
  );

  // Fallback should never happen since initialMonth is always defined.
  const month: CalendarMonth = currentMonth ?? initialMonth;

  const canGoToPreviousMonth = (() => {
    const prev = getPreviousMonth(month);
    if (prev.bsYear < BS_EPOCH_YEAR) return false;
    if (minDate) {
      // Can go back if the previous month's year >= minDate's year,
      // or if the previous month is at or after the minDate's month.
      return (
        isDateInRange(
          { bsYear: prev.bsYear, bsMonth: prev.bsMonth, bsDay: 1 },
          undefined,
          undefined
        ) &&
        (prev.bsYear > minDate.bsYear ||
          (prev.bsYear === minDate.bsYear && prev.bsMonth >= minDate.bsMonth))
      );
    }
    return true;
  })();

  const canGoToNextMonth = (() => {
    const next = getNextMonth(month);
    if (next.bsYear > BS_MAX_YEAR) return false;
    if (maxDate) {
      return (
        next.bsYear < maxDate.bsYear ||
        (next.bsYear === maxDate.bsYear && next.bsMonth <= maxDate.bsMonth)
      );
    }
    return true;
  })();

  const goToPreviousMonth = useCallback(() => {
    const prev = getPreviousMonth(month);
    if (prev.bsYear >= BS_EPOCH_YEAR) {
      setCurrentMonth(prev);
    }
  }, [month, setCurrentMonth]);

  const goToNextMonth = useCallback(() => {
    const next = getNextMonth(month);
    if (next.bsYear <= BS_MAX_YEAR) {
      setCurrentMonth(next);
    }
  }, [month, setCurrentMonth]);

  const goToToday = useCallback(() => {
    const today = adToBs(new Date());
    setCurrentMonth({ bsYear: today.bsYear, bsMonth: today.bsMonth });
  }, [setCurrentMonth]);

  return {
    currentMonth: month,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    canGoToPreviousMonth,
    canGoToNextMonth,
  };
}
