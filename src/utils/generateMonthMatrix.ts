import type { CalendarDate, CalendarMonth } from '../types';
import { getDaysInBsMonth } from './bsData';
import { bsToAd } from './bsToAd';

/**
 * A single cell in the calendar month matrix.
 *
 * `null` represents an empty cell (when `showAdjacentMonths` is false).
 */
export type MonthMatrixCell = CalendarDate | null;

/**
 * A row (week) in the calendar month matrix.
 */
export type MonthMatrixRow = MonthMatrixCell[];

export type GenerateMonthMatrixOptions = {
  /** First day of the week. 0 = Sunday, 1 = Monday, 6 = Saturday. Default: 0. */
  weekStartsOn?: 0 | 1 | 6;
  /** Whether to include days from adjacent months in leading/trailing cells. Default: false. */
  showAdjacentMonths?: boolean;
};

/**
 * Generates a 2D matrix (array of weeks) representing a calendar month view.
 *
 * Each week is an array of 7 cells. Cells are either a `CalendarDate`
 * or `null` (for empty slots when adjacent months are not shown).
 *
 * @param visibleMonth - The month to generate the matrix for.
 * @param options - Configuration options.
 * @returns An array of week rows.
 */
export function generateMonthMatrix(
  visibleMonth: CalendarMonth,
  options?: GenerateMonthMatrixOptions
): MonthMatrixRow[] {
  const weekStartsOn = options?.weekStartsOn ?? 0;
  const showAdjacentMonths = options?.showAdjacentMonths ?? false;

  const { bsYear, bsMonth } = visibleMonth;
  const daysInMonth = getDaysInBsMonth(bsYear, bsMonth);
  if (daysInMonth === undefined) {
    return [];
  }

  // Determine the weekday of the first day of the month.
  const firstDayAd = bsToAd({ bsYear, bsMonth, bsDay: 1 });
  const firstDayWeekday = firstDayAd.getDay(); // 0=Sun, 6=Sat

  // Calculate leading empty cells.
  let leadingBlanks = (firstDayWeekday - weekStartsOn + 7) % 7;

  const matrix: MonthMatrixRow[] = [];
  let currentRow: MonthMatrixCell[] = [];

  // Fill leading cells.
  if (showAdjacentMonths && leadingBlanks > 0) {
    const prev = getPreviousMonth(visibleMonth);
    const prevMonthDays = getDaysInBsMonth(prev.bsYear, prev.bsMonth);
    if (prevMonthDays !== undefined) {
      for (let i = leadingBlanks - 1; i >= 0; i--) {
        currentRow.push({
          bsYear: prev.bsYear,
          bsMonth: prev.bsMonth,
          bsDay: prevMonthDays - i,
        });
      }
    }
  } else {
    for (let i = 0; i < leadingBlanks; i++) {
      currentRow.push(null);
    }
  }

  // Fill days of the current month.
  for (let day = 1; day <= daysInMonth; day++) {
    currentRow.push({ bsYear, bsMonth, bsDay: day });

    if (currentRow.length === 7) {
      matrix.push(currentRow);
      currentRow = [];
    }
  }

  // Fill trailing cells.
  if (currentRow.length > 0) {
    const remaining = 7 - currentRow.length;
    if (showAdjacentMonths) {
      const next = getNextMonth(visibleMonth);
      for (let day = 1; day <= remaining; day++) {
        currentRow.push({
          bsYear: next.bsYear,
          bsMonth: next.bsMonth,
          bsDay: day,
        });
      }
    } else {
      for (let i = 0; i < remaining; i++) {
        currentRow.push(null);
      }
    }
    matrix.push(currentRow);
  }

  return matrix;
}

/**
 * Returns the previous month (wraps from Baisakh to previous year's Chaitra).
 */
export function getPreviousMonth(month: CalendarMonth): CalendarMonth {
  if (month.bsMonth === 1) {
    return { bsYear: month.bsYear - 1, bsMonth: 12 };
  }
  return { bsYear: month.bsYear, bsMonth: month.bsMonth - 1 };
}

/**
 * Returns the next month (wraps from Chaitra to next year's Baisakh).
 */
export function getNextMonth(month: CalendarMonth): CalendarMonth {
  if (month.bsMonth === 12) {
    return { bsYear: month.bsYear + 1, bsMonth: 1 };
  }
  return { bsYear: month.bsYear, bsMonth: month.bsMonth + 1 };
}
