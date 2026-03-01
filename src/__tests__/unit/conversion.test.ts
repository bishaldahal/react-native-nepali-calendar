import { adToBs } from '../../utils/adToBs';
import { bsToAd } from '../../utils/bsToAd';

describe('bsToAd', () => {
  it('converts BS epoch date correctly', () => {
    // 2000/01/01 BS = 1943/04/14 AD
    const result = bsToAd({ bsYear: 2000, bsMonth: 1, bsDay: 1 });
    expect(result.getFullYear()).toBe(1943);
    expect(result.getMonth()).toBe(3); // April (0-indexed)
    expect(result.getDate()).toBe(14);
  });

  it('converts a known date correctly', () => {
    // 2082/01/01 BS is a well-known date
    const result = bsToAd({ bsYear: 2082, bsMonth: 1, bsDay: 1 });
    // 2082/01/01 BS = 2025/04/14 AD
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(3); // April
    expect(result.getDate()).toBe(14);
  });

  it('throws for year below supported range', () => {
    expect(() => bsToAd({ bsYear: 1999, bsMonth: 1, bsDay: 1 })).toThrow(
      RangeError
    );
  });

  it('throws for year above supported range', () => {
    expect(() => bsToAd({ bsYear: 2091, bsMonth: 1, bsDay: 1 })).toThrow(
      RangeError
    );
  });
});

describe('adToBs', () => {
  it('converts AD epoch date correctly', () => {
    // 1943/04/14 AD = 2000/01/01 BS
    const result = adToBs(new Date(1943, 3, 14));
    expect(result).toEqual({ bsYear: 2000, bsMonth: 1, bsDay: 1 });
  });

  it('converts a known date correctly', () => {
    // 2025/04/14 AD = 2082/01/01 BS
    const result = adToBs(new Date(2025, 3, 14));
    expect(result).toEqual({ bsYear: 2082, bsMonth: 1, bsDay: 1 });
  });

  it('round-trips correctly', () => {
    const original = { bsYear: 2080, bsMonth: 6, bsDay: 15 };
    const ad = bsToAd(original);
    const roundTripped = adToBs(ad);
    expect(roundTripped).toEqual(original);
  });

  it('throws for date before supported range', () => {
    expect(() => adToBs(new Date(1940, 0, 1))).toThrow(RangeError);
  });
});

describe('adToBs and bsToAd round-trip', () => {
  // Test several dates across the range.
  const testCases = [
    { bsYear: 2050, bsMonth: 1, bsDay: 1 },
    { bsYear: 2060, bsMonth: 6, bsDay: 15 },
    { bsYear: 2070, bsMonth: 12, bsDay: 1 },
    { bsYear: 2080, bsMonth: 3, bsDay: 20 },
    { bsYear: 2082, bsMonth: 10, bsDay: 10 },
  ];

  testCases.forEach((bsDate) => {
    it(`round-trips ${bsDate.bsYear}/${bsDate.bsMonth}/${bsDate.bsDay}`, () => {
      const ad = bsToAd(bsDate);
      const result = adToBs(ad);
      expect(result).toEqual(bsDate);
    });
  });
});
