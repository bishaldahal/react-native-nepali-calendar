import { useMemo } from 'react';
import type { CalendarMonth } from '../types';
import {
  generateMonthMatrix,
  type MonthMatrixRow,
} from '../utils/generateMonthMatrix';

export type UseCalendarMatrixOptions = {
  visibleMonth: CalendarMonth;
  weekStartsOn?: 0 | 1 | 6;
  showAdjacentMonths?: boolean;
};

/**
 * Hook that memoizes the calendar month matrix based on the visible month
 * and display options. Recomputes only when inputs change.
 */
export function useCalendarMatrix(
  options: UseCalendarMatrixOptions
): MonthMatrixRow[] {
  const {
    visibleMonth,
    weekStartsOn = 0,
    showAdjacentMonths = false,
  } = options;

  return useMemo(
    () =>
      generateMonthMatrix(visibleMonth, { weekStartsOn, showAdjacentMonths }),
    [visibleMonth, weekStartsOn, showAdjacentMonths]
  );
}
