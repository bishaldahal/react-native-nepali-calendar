import { BS_MONTHS_NE } from '../constants/months';
import { WEEKDAYS_NE, WEEKDAYS_SHORT_NE } from '../constants/weekdays';

/** Nepali (Devanagari) numeral digits. */
const NE_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'] as const;

export const ne = {
  months: BS_MONTHS_NE,
  weekdays: WEEKDAYS_NE,
  weekdaysShort: WEEKDAYS_SHORT_NE,
  digits: NE_DIGITS,
  today: 'आज',
  previousMonth: 'अघिल्लो महिना',
  nextMonth: 'अर्को महिना',
  goToToday: 'आजमा जानुहोस्',
} as const;
