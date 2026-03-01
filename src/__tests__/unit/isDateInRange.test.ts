import { isDateInRange } from '../../utils/isDateInRange';

describe('isDateInRange', () => {
  const date = { bsYear: 2082, bsMonth: 6, bsDay: 15 };

  it('returns true when no constraints are set', () => {
    expect(isDateInRange(date)).toBe(true);
  });

  it('returns true when date equals minDate', () => {
    expect(isDateInRange(date, date)).toBe(true);
  });

  it('returns true when date equals maxDate', () => {
    expect(isDateInRange(date, undefined, date)).toBe(true);
  });

  it('returns true when date is within range', () => {
    const min = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    const max = { bsYear: 2082, bsMonth: 12, bsDay: 30 };
    expect(isDateInRange(date, min, max)).toBe(true);
  });

  it('returns false when date is before minDate', () => {
    const min = { bsYear: 2082, bsMonth: 7, bsDay: 1 };
    expect(isDateInRange(date, min)).toBe(false);
  });

  it('returns false when date is after maxDate', () => {
    const max = { bsYear: 2082, bsMonth: 5, bsDay: 30 };
    expect(isDateInRange(date, undefined, max)).toBe(false);
  });
});
