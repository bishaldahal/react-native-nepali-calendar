import { isValidBsDate } from '../../utils/validation';

describe('isValidBsDate', () => {
  it('returns true for a valid date', () => {
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 1, bsDay: 1 })).toBe(true);
  });

  it('returns true for last day of a month', () => {
    // Baisakh 2082 has 31 days
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 1, bsDay: 31 })).toBe(true);
  });

  it('returns false for day exceeding month length', () => {
    // Baisakh 2082 has 31 days, day 32 is invalid
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 1, bsDay: 32 })).toBe(false);
  });

  it('returns false for month 0', () => {
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 0, bsDay: 1 })).toBe(false);
  });

  it('returns false for month 13', () => {
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 13, bsDay: 1 })).toBe(false);
  });

  it('returns false for day 0', () => {
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 1, bsDay: 0 })).toBe(false);
  });

  it('returns false for negative day', () => {
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 1, bsDay: -1 })).toBe(false);
  });

  it('returns false for year below supported range', () => {
    expect(isValidBsDate({ bsYear: 1999, bsMonth: 1, bsDay: 1 })).toBe(false);
  });

  it('returns false for year above supported range', () => {
    expect(isValidBsDate({ bsYear: 2091, bsMonth: 1, bsDay: 1 })).toBe(false);
  });

  it('returns false for non-integer values', () => {
    expect(isValidBsDate({ bsYear: 2082, bsMonth: 1.5, bsDay: 1 })).toBe(false);
  });
});
