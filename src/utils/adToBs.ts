import type { CalendarDate } from '../types';
import { AD_EPOCH, BS_EPOCH_YEAR, BS_MAX_YEAR, BS_MONTH_DAYS } from './bsData';

/**
 * Converts an AD (Gregorian) date to a BS (Bikram Sambat) date.
 *
 * The conversion works by counting the total number of days between
 * the AD epoch (1943/04/14) and the given AD date, then walking
 * through BS years and months to find the corresponding BS date.
 *
 * @param adDate - A JavaScript Date object (time is ignored, only date is used).
 * @returns The corresponding BS date.
 * @throws {RangeError} If the AD date is outside the supported conversion range.
 */
export function adToBs(adDate: Date): CalendarDate {
  // Calculate total days between the AD epoch and the given date.
  const epochTime = new Date(
    AD_EPOCH.getFullYear(),
    AD_EPOCH.getMonth(),
    AD_EPOCH.getDate()
  ).getTime();
  const targetTime = new Date(
    adDate.getFullYear(),
    adDate.getMonth(),
    adDate.getDate()
  ).getTime();

  let totalDays = Math.round((targetTime - epochTime) / (1000 * 60 * 60 * 24));

  if (totalDays < 0) {
    throw new RangeError(
      'AD date is before the supported BS conversion range (before 1943/04/14).'
    );
  }

  let bsYear = BS_EPOCH_YEAR;
  let bsMonth = 1;
  let bsDay = 1;

  // Walk through years.
  while (bsYear <= BS_MAX_YEAR) {
    const yearData = BS_MONTH_DAYS[bsYear];
    if (!yearData) break;

    let yearDays = 0;
    for (const md of yearData) {
      yearDays += md;
    }

    if (totalDays < yearDays) break;
    totalDays -= yearDays;
    bsYear++;
  }

  if (bsYear > BS_MAX_YEAR) {
    throw new RangeError(
      `AD date is beyond the supported BS conversion range (after BS ${BS_MAX_YEAR}).`
    );
  }

  // Walk through months of the target year.
  const yearData = BS_MONTH_DAYS[bsYear];
  if (!yearData) {
    throw new RangeError(`Missing BS calendar data for year ${bsYear}.`);
  }

  for (let m = 0; m < 12; m++) {
    const monthDays = yearData[m]!;
    if (totalDays < monthDays) {
      bsMonth = m + 1;
      bsDay = totalDays + 1;
      break;
    }
    totalDays -= monthDays;
  }

  return { bsYear, bsMonth, bsDay };
}
