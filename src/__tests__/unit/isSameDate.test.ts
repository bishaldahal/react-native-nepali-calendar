import { isSameDate } from '../../utils/isSameDate';

describe('isSameDate', () => {
  it('returns true for the same date', () => {
    const a = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    const b = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    expect(isSameDate(a, b)).toBe(true);
  });

  it('returns false for different years', () => {
    const a = { bsYear: 2081, bsMonth: 1, bsDay: 1 };
    const b = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    expect(isSameDate(a, b)).toBe(false);
  });

  it('returns false for different months', () => {
    const a = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    const b = { bsYear: 2082, bsMonth: 2, bsDay: 1 };
    expect(isSameDate(a, b)).toBe(false);
  });

  it('returns false for different days', () => {
    const a = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    const b = { bsYear: 2082, bsMonth: 1, bsDay: 15 };
    expect(isSameDate(a, b)).toBe(false);
  });
});
