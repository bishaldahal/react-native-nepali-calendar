import { toLocalNumeral, getLocale } from '../../locale';

describe('toLocalNumeral', () => {
  it('converts to English numerals (identity)', () => {
    expect(toLocalNumeral(123, 'en')).toBe('123');
  });

  it('converts to Nepali numerals', () => {
    expect(toLocalNumeral(123, 'ne')).toBe('१२३');
  });

  it('converts 0 correctly', () => {
    expect(toLocalNumeral(0, 'ne')).toBe('०');
  });

  it('converts large numbers', () => {
    expect(toLocalNumeral(2082, 'ne')).toBe('२०८२');
  });
});

describe('getLocale', () => {
  it('returns English locale data', () => {
    const data = getLocale('en');
    expect(data.months).toHaveLength(12);
    expect(data.weekdays).toHaveLength(7);
    expect(data.weekdaysShort).toHaveLength(7);
    expect(data.months[0]).toBe('Baisakh');
  });

  it('returns Nepali locale data', () => {
    const data = getLocale('ne');
    expect(data.months).toHaveLength(12);
    expect(data.weekdays).toHaveLength(7);
    expect(data.months[0]).toBe('बैशाख');
  });
});
