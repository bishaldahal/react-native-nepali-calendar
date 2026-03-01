import type { CalendarDate } from '../types';
import {
  AD_EPOCH,
  BS_EPOCH_YEAR,
  BS_MAX_YEAR,
  BS_MONTH_DAYS,
  getDaysInBsMonth,
} from './bsData';

/**
 * Converts a BS (Bikram Sambat) date to an AD (Gregorian) Date.
 *
 * The conversion works by counting the total number of days from
 * the BS epoch (2000/01/01 BS = 1943/04/14 AD) to the target BS date,
 * then adding those days to the AD epoch.
 *
 * @param date - A valid BS date within the supported range.
 * @returns The corresponding Gregorian Date (time set to midnight UTC).
 * @throws {RangeError} If the BS date is outside the supported range.
 */
export function bsToAd(date: CalendarDate): Date {
  const { bsYear, bsMonth, bsDay } = date;

  if (bsYear < BS_EPOCH_YEAR || bsYear > BS_MAX_YEAR) {
    throw new RangeError(
      `BS year ${bsYear} is outside the supported range (${BS_EPOCH_YEAR}–${BS_MAX_YEAR}).`
    );
  }

  let totalDays = 0;

  // Add days for complete years between epoch year and target year.
  for (let y = BS_EPOCH_YEAR; y < bsYear; y++) {
    const yearData = BS_MONTH_DAYS[y];
    if (!yearData) {
      throw new RangeError(`Missing BS calendar data for year ${y}.`);
    }
    for (const monthDays of yearData) {
      totalDays += monthDays;
    }
  }

  // Add days for complete months in the target year.
  for (let m = 1; m < bsMonth; m++) {
    const daysInMonth = getDaysInBsMonth(bsYear, m);
    if (daysInMonth === undefined) {
      throw new RangeError(`Missing BS calendar data for ${bsYear}/${m}.`);
    }
    totalDays += daysInMonth;
  }

  // Add remaining days (subtract 1 because the epoch date itself is day 1).
  totalDays += bsDay - 1;

  // Compute AD date by adding totalDays to the epoch.
  const result = new Date(AD_EPOCH.getTime());
  result.setDate(result.getDate() + totalDays);
  return result;
}
