import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type {
  CalendarDate,
  CalendarMonth,
  CalendarNumeral,
  CalendarStyles,
  CalendarTheme,
  MarkedDate,
  RenderDayParams,
} from '../../types';
import type { MonthMatrixRow } from '../../utils/generateMonthMatrix';
import { dateKey } from '../../utils/keys';
import { NepaliCalendarDay } from './NepaliCalendarDay';
import { buildMarkedDatesMap, computeDayState, getTodayBs } from './helpers';

export type NepaliCalendarGridProps = {
  matrix: MonthMatrixRow[];
  visibleMonth: CalendarMonth;
  selectedDate: CalendarDate | undefined;
  numeral: CalendarNumeral;
  theme: CalendarTheme;
  calendarStyles: CalendarStyles | undefined;
  showTodayHighlight: boolean;
  dayTestIDPrefix: string;
  onDayPress: (date: CalendarDate) => void;
  // Disabled state inputs.
  disabled: boolean;
  disablePastDates: boolean;
  disableFutureDates: boolean;
  minDate: CalendarDate | undefined;
  maxDate: CalendarDate | undefined;
  disabledDates: CalendarDate[] | undefined;
  isDateDisabled: ((date: CalendarDate) => boolean) | undefined;
  // Marked dates.
  markedDates: MarkedDate[] | undefined;
  // Custom renderers.
  renderDay?: (params: RenderDayParams) => React.ReactNode;
  getDayAccessibilityLabel?: (date: CalendarDate) => string;
};

function NepaliCalendarGridInner(props: NepaliCalendarGridProps) {
  const {
    matrix,
    visibleMonth,
    selectedDate,
    numeral,
    theme,
    calendarStyles,
    showTodayHighlight,
    dayTestIDPrefix,
    onDayPress,
    disabled,
    disablePastDates,
    disableFutureDates,
    minDate,
    maxDate,
    disabledDates,
    isDateDisabled,
    markedDates,
    renderDay,
    getDayAccessibilityLabel,
  } = props;

  const today = useMemo(() => getTodayBs(), []);
  const markedDatesMap = useMemo(
    () => buildMarkedDatesMap(markedDates),
    [markedDates]
  );

  return (
    <View style={styles.grid}>
      {matrix.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((cell, cellIndex) => {
            if (cell === null) {
              return <View key={cellIndex} style={styles.emptyCell} />;
            }

            const state = computeDayState({
              date: cell,
              visibleMonth,
              selectedDate,
              today,
              markedDatesMap,
              minDate,
              maxDate,
              disabled,
              disablePastDates,
              disableFutureDates,
              disabledDates,
              isDateDisabledFn: isDateDisabled,
            });

            return (
              <NepaliCalendarDay
                key={dateKey(cell)}
                date={cell}
                isSelected={state.isSelected}
                isToday={state.isToday}
                isDisabled={state.isDisabled}
                isMarked={state.isMarked}
                isOutsideMonth={state.isOutsideMonth}
                markedDate={state.markedDate}
                showTodayHighlight={showTodayHighlight}
                numeral={numeral}
                theme={theme}
                calendarStyles={calendarStyles}
                dayTestIDPrefix={dayTestIDPrefix}
                onPress={onDayPress}
                renderDay={renderDay}
                getDayAccessibilityLabel={getDayAccessibilityLabel}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export const NepaliCalendarGrid = memo(NepaliCalendarGridInner);

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 4,
  },
  weekRow: {
    flexDirection: 'row',
  },
  emptyCell: {
    flex: 1,
  },
});
