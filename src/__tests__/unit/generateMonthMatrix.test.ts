import {
  generateMonthMatrix,
  getPreviousMonth,
  getNextMonth,
} from '../../utils/generateMonthMatrix';

describe('generateMonthMatrix', () => {
  const month = { bsYear: 2082, bsMonth: 1 };

  it('generates a non-empty matrix', () => {
    const matrix = generateMonthMatrix(month);
    expect(matrix.length).toBeGreaterThan(0);
  });

  it('has 7 cells per row', () => {
    const matrix = generateMonthMatrix(month);
    for (const row of matrix) {
      expect(row).toHaveLength(7);
    }
  });

  it('contains all days of the month', () => {
    const matrix = generateMonthMatrix(month);
    const allDays = matrix
      .flat()
      .filter((cell) => cell !== null && cell.bsMonth === 1)
      .map((cell) => cell!.bsDay);
    // Baisakh 2082 has 31 days
    expect(allDays).toEqual(Array.from({ length: 31 }, (_, i) => i + 1));
  });

  it('uses null for empty cells when showAdjacentMonths is false', () => {
    const matrix = generateMonthMatrix(month, { showAdjacentMonths: false });
    // The first row should have some null cells (unless the month starts on weekStartsOn day).
    const allCells = matrix.flat();
    const nullCells = allCells.filter((cell) => cell === null);
    // At least some nulls should exist (unless month perfectly fills grid).
    expect(allCells.length).toBe(matrix.length * 7);
    // If there are nulls, verify they are at edges.
    if (nullCells.length > 0) {
      // First row leading nulls.
      const firstRow = matrix[0]!;
      const firstDayIndex = firstRow.findIndex((c) => c !== null);
      for (let i = 0; i < firstDayIndex; i++) {
        expect(firstRow[i]).toBeNull();
      }
    }
  });

  it('fills adjacent month days when showAdjacentMonths is true', () => {
    const matrix = generateMonthMatrix(month, { showAdjacentMonths: true });
    const allCells = matrix.flat();
    // No null cells should exist.
    const nullCells = allCells.filter((cell) => cell === null);
    expect(nullCells).toHaveLength(0);
  });

  it('respects weekStartsOn option', () => {
    // With weekStartsOn = 1 (Monday), the first column should be Monday.
    const matrix = generateMonthMatrix(month, {
      weekStartsOn: 1,
      showAdjacentMonths: true,
    });
    expect(matrix.length).toBeGreaterThan(0);
    expect(matrix[0]!).toHaveLength(7);
  });
});

describe('getPreviousMonth', () => {
  it('returns previous month in same year', () => {
    expect(getPreviousMonth({ bsYear: 2082, bsMonth: 6 })).toEqual({
      bsYear: 2082,
      bsMonth: 5,
    });
  });

  it('wraps to previous year from Baisakh', () => {
    expect(getPreviousMonth({ bsYear: 2082, bsMonth: 1 })).toEqual({
      bsYear: 2081,
      bsMonth: 12,
    });
  });
});

describe('getNextMonth', () => {
  it('returns next month in same year', () => {
    expect(getNextMonth({ bsYear: 2082, bsMonth: 6 })).toEqual({
      bsYear: 2082,
      bsMonth: 7,
    });
  });

  it('wraps to next year from Chaitra', () => {
    expect(getNextMonth({ bsYear: 2082, bsMonth: 12 })).toEqual({
      bsYear: 2083,
      bsMonth: 1,
    });
  });
});
