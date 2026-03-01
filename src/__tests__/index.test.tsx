// Primary tests are in unit/ and components/ subdirectories.
describe('package', () => {
  it('exports NepaliCalendar', () => {
    const exports = require('../index');
    expect(exports.NepaliCalendar).toBeDefined();
  });

  it('exports utility functions', () => {
    const exports = require('../index');
    expect(exports.adToBs).toBeDefined();
    expect(exports.bsToAd).toBeDefined();
    expect(exports.compareDates).toBeDefined();
    expect(exports.isSameDate).toBeDefined();
    expect(exports.isDateInRange).toBeDefined();
    expect(exports.isValidBsDate).toBeDefined();
    expect(exports.formatBsDate).toBeDefined();
    expect(exports.generateMonthMatrix).toBeDefined();
  });

  it('exports locale utilities', () => {
    const exports = require('../index');
    expect(exports.getLocale).toBeDefined();
    expect(exports.toLocalNumeral).toBeDefined();
  });
});
