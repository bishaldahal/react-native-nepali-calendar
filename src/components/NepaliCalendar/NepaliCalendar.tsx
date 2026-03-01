import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { CalendarDate, NepaliCalendarProps } from '../../types';
import { defaultTheme } from '../../theme/defaultTheme';
import { CALENDAR_DEFAULTS } from '../../constants/defaults';
import { useControllableState } from '../../hooks/useControllableState';
import { useVisibleMonth } from '../../hooks/useVisibleMonth';
import { useCalendarMatrix } from '../../hooks/useCalendarMatrix';
import { NepaliCalendarHeader } from './NepaliCalendarHeader';
import { NepaliCalendarWeekdays } from './NepaliCalendarWeekdays';
import { NepaliCalendarGrid } from './NepaliCalendarGrid';

/**
 * A customizable Nepali calendar component with Bikram Sambat (BS) support.
 *
 * Supports both controlled and uncontrolled usage for selected date
 * and visible month.
 *
 * @example
 * ```tsx
 * <NepaliCalendar
 *   onChange={(date) => console.log(date)}
 *   locale="ne"
 *   numeral="ne"
 * />
 * ```
 */
export function NepaliCalendar(props: NepaliCalendarProps) {
  const {
    value,
    defaultValue,
    onChange,
    visibleMonth,
    defaultVisibleMonth,
    onVisibleMonthChange,
    selectionMode = CALENDAR_DEFAULTS.selectionMode,
    minDate,
    maxDate,
    disabled = false,
    disablePastDates = false,
    disableFutureDates = false,
    disabledDates,
    isDateDisabled,
    markedDates,
    locale = CALENDAR_DEFAULTS.locale,
    numeral = CALENDAR_DEFAULTS.numeral,
    weekStartsOn = CALENDAR_DEFAULTS.weekStartsOn,
    showHeader = CALENDAR_DEFAULTS.showHeader,
    showWeekdays = CALENDAR_DEFAULTS.showWeekdays,
    showAdjacentMonths = CALENDAR_DEFAULTS.showAdjacentMonths,
    showTodayHighlight = CALENDAR_DEFAULTS.showTodayHighlight,
    theme: themeProp,
    styles: stylesProp,
    style,
    renderDay,
    renderHeader,
    accessibility,
    getDayAccessibilityLabel,
    testID = CALENDAR_DEFAULTS.testID,
    dayTestIDPrefix = CALENDAR_DEFAULTS.dayTestIDPrefix,
  } = props;

  // Dev warning for unsupported selection modes.
  if (__DEV__ && selectionMode !== 'single') {
    console.warn(
      `NepaliCalendar: selectionMode="${selectionMode}" is not yet fully supported. Falling back to "single" behavior.`
    );
  }

  const theme = useMemo(() => ({ ...defaultTheme, ...themeProp }), [themeProp]);

  // Selected date state (controlled / uncontrolled).
  const [selectedDate, setSelectedDate] = useControllableState<CalendarDate>(
    value,
    defaultValue,
    onChange
  );

  // Visible month state (controlled / uncontrolled).
  const {
    currentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    canGoToPreviousMonth,
    canGoToNextMonth,
  } = useVisibleMonth({
    visibleMonth,
    defaultVisibleMonth,
    onVisibleMonthChange,
    selectedDate: value,
    defaultSelectedDate: defaultValue,
    minDate,
    maxDate,
  });

  // Generate calendar matrix.
  const matrix = useCalendarMatrix({
    visibleMonth: currentMonth,
    weekStartsOn,
    showAdjacentMonths,
  });

  // Day press handler.
  const handleDayPress = useCallback(
    (date: CalendarDate) => {
      if (disabled) return;
      setSelectedDate(date);
    },
    [disabled, setSelectedDate]
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundColor },
        stylesProp?.container,
        style,
      ]}
      testID={testID}
      accessibilityRole="none"
    >
      {showHeader && (
        <NepaliCalendarHeader
          bsYear={currentMonth.bsYear}
          bsMonth={currentMonth.bsMonth}
          locale={locale}
          numeral={numeral}
          theme={theme}
          calendarStyles={stylesProp}
          canGoToPreviousMonth={canGoToPreviousMonth && !disabled}
          canGoToNextMonth={canGoToNextMonth && !disabled}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
          goToToday={goToToday}
          accessibility={accessibility}
          renderHeader={renderHeader}
        />
      )}

      {showWeekdays && (
        <NepaliCalendarWeekdays
          locale={locale}
          weekStartsOn={weekStartsOn}
          theme={theme}
          calendarStyles={stylesProp}
        />
      )}

      <NepaliCalendarGrid
        matrix={matrix}
        visibleMonth={currentMonth}
        selectedDate={selectedDate}
        numeral={numeral}
        theme={theme}
        calendarStyles={stylesProp}
        showTodayHighlight={showTodayHighlight}
        dayTestIDPrefix={dayTestIDPrefix}
        onDayPress={handleDayPress}
        disabled={disabled}
        disablePastDates={disablePastDates}
        disableFutureDates={disableFutureDates}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        isDateDisabled={isDateDisabled}
        markedDates={markedDates}
        renderDay={renderDay}
        getDayAccessibilityLabel={getDayAccessibilityLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
