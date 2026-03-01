import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { NepaliCalendar } from '../../components/NepaliCalendar';

// Mock the date to make tests deterministic.
const MOCK_TODAY = new Date(2025, 6, 15); // July 15, 2025 (around Shrawan 2082)

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(MOCK_TODAY);
});

afterAll(() => {
  jest.useRealTimers();
});

describe('NepaliCalendar', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<NepaliCalendar />);
    expect(getByTestId('nepali-calendar')).toBeTruthy();
  });

  it('renders with a custom testID', () => {
    const { getByTestId } = render(<NepaliCalendar testID="my-calendar" />);
    expect(getByTestId('my-calendar')).toBeTruthy();
  });

  it('renders the month header', () => {
    const { getByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        locale="en"
        numeral="en"
      />
    );
    expect(getByText('Baisakh 2082')).toBeTruthy();
  });

  it('renders weekday labels', () => {
    const { getByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        locale="en"
      />
    );
    expect(getByText('Sun')).toBeTruthy();
    expect(getByText('Mon')).toBeTruthy();
  });

  it('hides header when showHeader is false', () => {
    const { queryByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        showHeader={false}
        locale="en"
        numeral="en"
      />
    );
    expect(queryByText('Baisakh 2082')).toBeNull();
  });

  it('hides weekdays when showWeekdays is false', () => {
    const { queryByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        showWeekdays={false}
        locale="en"
      />
    );
    expect(queryByText('Sun')).toBeNull();
  });

  it('fires onChange when a day is pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        onChange={onChange}
      />
    );
    const dayCell = getByTestId('calendar-day-2082-01-15');
    fireEvent.press(dayCell);
    expect(onChange).toHaveBeenCalledWith({
      bsYear: 2082,
      bsMonth: 1,
      bsDay: 15,
    });
  });

  it('does not fire onChange when a disabled date is pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        onChange={onChange}
        disabledDates={[{ bsYear: 2082, bsMonth: 1, bsDay: 15 }]}
      />
    );
    const dayCell = getByTestId('calendar-day-2082-01-15');
    fireEvent.press(dayCell);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not fire onChange when disabled is true', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        onChange={onChange}
        disabled
      />
    );
    const dayCell = getByTestId('calendar-day-2082-01-15');
    fireEvent.press(dayCell);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('fires onVisibleMonthChange when navigating', () => {
    const onVisibleMonthChange = jest.fn();
    const { getByLabelText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        onVisibleMonthChange={onVisibleMonthChange}
        locale="en"
      />
    );
    const nextButton = getByLabelText('Next month');
    fireEvent.press(nextButton);
    expect(onVisibleMonthChange).toHaveBeenCalledWith({
      bsYear: 2082,
      bsMonth: 2,
    });
  });

  it('renders with Nepali locale', () => {
    const { getByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        locale="ne"
        numeral="ne"
      />
    );
    expect(getByText('बैशाख २०८२')).toBeTruthy();
  });

  it('renders custom day via renderDay', () => {
    const { getByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        renderDay={({ date }) => <Text>{`custom-${date.bsDay}`}</Text>}
      />
    );
    expect(getByText('custom-15')).toBeTruthy();
  });

  it('renders custom header via renderHeader', () => {
    const { getByText } = render(
      <NepaliCalendar
        defaultVisibleMonth={{ bsYear: 2082, bsMonth: 1 }}
        renderHeader={({ monthLabel }) => (
          <Text>{`Header: ${monthLabel}`}</Text>
        )}
        locale="en"
        numeral="en"
      />
    );
    expect(getByText('Header: Baisakh 2082')).toBeTruthy();
  });
});
