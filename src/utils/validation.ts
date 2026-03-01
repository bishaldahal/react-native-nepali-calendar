import type { CalendarDate } from '../types';
import { BS_EPOCH_YEAR, BS_MAX_YEAR, getDaysInBsMonth } from './bsData';

/**
 * Validates whether a BS date is structurally and calendrically correct.
 *
 * Checks:
 * - Year is within the supported data range (BS_EPOCH_YEAR–BS_MAX_YEAR).
 * - Month is between 1 and 12.
 * - Day is between 1 and the actual number of days in that month.
 *
 * @param date - The BS date to validate.
 * @returns `true` if the date is valid.
 */
export function isValidBsDate(date: CalendarDate): boolean {
  const { bsYear, bsMonth, bsDay } = date;

  if (
    !Number.isInteger(bsYear) ||
    !Number.isInteger(bsMonth) ||
    !Number.isInteger(bsDay)
  ) {
    return false;
  }

  if (bsYear < BS_EPOCH_YEAR || bsYear > BS_MAX_YEAR) {
    return false;
  }

  if (bsMonth < 1 || bsMonth > 12) {
    return false;
  }

  const daysInMonth = getDaysInBsMonth(bsYear, bsMonth);
  if (daysInMonth === undefined) {
    return false;
  }

  return bsDay >= 1 && bsDay <= daysInMonth;
}
