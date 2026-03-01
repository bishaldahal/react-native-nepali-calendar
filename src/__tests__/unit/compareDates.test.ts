import { compareDates } from '../../utils/compareDates';

describe('compareDates', () => {
  it('returns 0 for identical dates', () => {
    const d = { bsYear: 2082, bsMonth: 1, bsDay: 15 };
    expect(compareDates(d, d)).toBe(0);
  });

  it('returns negative when a is before b (year)', () => {
    const a = { bsYear: 2081, bsMonth: 12, bsDay: 30 };
    const b = { bsYear: 2082, bsMonth: 1, bsDay: 1 };
    expect(compareDates(a, b)).toBeLessThan(0);
  });

  it('returns positive when a is after b (year)', () => {
    const a = { bsYear: 2083, bsMonth: 1, bsDay: 1 };
    const b = { bsYear: 2082, bsMonth: 12, bsDay: 30 };
    expect(compareDates(a, b)).toBeGreaterThan(0);
  });

  it('returns negative when a is before b (month)', () => {
    const a = { bsYear: 2082, bsMonth: 3, bsDay: 15 };
    const b = { bsYear: 2082, bsMonth: 5, bsDay: 15 };
    expect(compareDates(a, b)).toBeLessThan(0);
  });

  it('returns positive when a is after b (day)', () => {
    const a = { bsYear: 2082, bsMonth: 5, bsDay: 20 };
    const b = { bsYear: 2082, bsMonth: 5, bsDay: 10 };
    expect(compareDates(a, b)).toBeGreaterThan(0);
  });
});
