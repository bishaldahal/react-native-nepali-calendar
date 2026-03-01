import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type {
  CalendarDate,
  CalendarNumeral,
  CalendarStyles,
  CalendarTheme,
  MarkedDate,
  RenderDayParams,
} from '../../types';
import { defaultTheme } from '../../theme/defaultTheme';
import { toLocalNumeral } from '../../locale';
import { dayTestID } from '../../utils/keys';

export type NepaliCalendarDayProps = {
  date: CalendarDate;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isMarked: boolean;
  isOutsideMonth: boolean;
  markedDate: MarkedDate | undefined;
  showTodayHighlight: boolean;
  numeral: CalendarNumeral;
  theme: CalendarTheme;
  calendarStyles: CalendarStyles | undefined;
  dayTestIDPrefix: string;
  onPress: (date: CalendarDate) => void;
  renderDay?: (params: RenderDayParams) => React.ReactNode;
  getDayAccessibilityLabel?: (date: CalendarDate) => string;
};

function NepaliCalendarDayInner(props: NepaliCalendarDayProps) {
  const {
    date,
    isSelected,
    isToday,
    isDisabled,
    isMarked,
    isOutsideMonth,
    markedDate,
    showTodayHighlight,
    numeral,
    theme,
    calendarStyles,
    dayTestIDPrefix,
    onPress,
    renderDay,
    getDayAccessibilityLabel,
  } = props;

  const mergedTheme = { ...defaultTheme, ...theme };

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onPress(date);
    }
  }, [date, isDisabled, onPress]);

  // Build accessibility label.
  const accessibilityLabel = getDayAccessibilityLabel
    ? getDayAccessibilityLabel(date)
    : buildDefaultAccessibilityLabel(date, { isSelected, isToday, isDisabled });

  // Custom renderer.
  if (renderDay) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{
          selected: isSelected,
          disabled: isDisabled,
        }}
        testID={dayTestID(dayTestIDPrefix, date)}
        style={styles.dayWrapper}
      >
        {renderDay({
          date,
          isSelected,
          isToday,
          isDisabled,
          isMarked,
          isOutsideMonth,
        })}
      </Pressable>
    );
  }

  // Default day cell styles.
  const dayContainerStyles = [
    styles.dayContainer,
    calendarStyles?.day,
    isOutsideMonth && [styles.outsideMonthDay, calendarStyles?.outsideMonthDay],
    showTodayHighlight &&
      isToday && [
        styles.todayDay,
        { borderColor: mergedTheme.todayBorderColor },
        calendarStyles?.todayDay,
      ],
    isSelected && [
      styles.selectedDay,
      { backgroundColor: mergedTheme.selectedBgColor },
      calendarStyles?.selectedDay,
    ],
    isMarked &&
      markedDate?.variant === 'filled' &&
      !isSelected && [
        { backgroundColor: markedDate.color ?? mergedTheme.markerColor },
        calendarStyles?.markedDay,
      ],
    isMarked &&
      markedDate?.variant === 'outlined' &&
      !isSelected && [
        {
          borderWidth: 1,
          borderColor: markedDate.color ?? mergedTheme.markerColor,
        },
        calendarStyles?.markedDay,
      ],
  ];

  const dayTextStyles = [
    styles.dayText,
    { color: mergedTheme.dayTextColor },
    calendarStyles?.dayText,
    isOutsideMonth && [
      styles.outsideMonthDayText,
      { color: mergedTheme.disabledTextColor },
      calendarStyles?.outsideMonthDayText,
    ],
    isDisabled && [
      { color: mergedTheme.disabledTextColor },
      calendarStyles?.disabledDayText,
    ],
    isSelected && [
      { color: mergedTheme.selectedTextColor },
      calendarStyles?.selectedDayText,
    ],
    isMarked &&
      markedDate?.textColor &&
      !isSelected && { color: markedDate.textColor },
    isMarked &&
      markedDate?.variant === 'filled' &&
      !isSelected && { color: '#FFFFFF' },
  ];

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        selected: isSelected,
        disabled: isDisabled,
      }}
      testID={dayTestID(dayTestIDPrefix, date)}
      style={styles.dayWrapper}
    >
      <View style={dayContainerStyles}>
        <Text style={dayTextStyles}>{toLocalNumeral(date.bsDay, numeral)}</Text>
      </View>
      {isMarked && markedDate?.variant === 'dot' && !isSelected && (
        <View
          style={[
            styles.marker,
            { backgroundColor: markedDate.color ?? mergedTheme.markerColor },
            calendarStyles?.marker,
          ]}
        />
      )}
    </Pressable>
  );
}

export const NepaliCalendarDay = memo(NepaliCalendarDayInner);

function buildDefaultAccessibilityLabel(
  date: CalendarDate,
  state: { isSelected: boolean; isToday: boolean; isDisabled: boolean }
): string {
  const parts: string[] = [
    `${date.bsDay}`,
    `month ${date.bsMonth}`,
    `${date.bsYear}`,
  ];
  if (state.isToday) parts.push('today');
  if (state.isSelected) parts.push('selected');
  if (state.isDisabled) parts.push('disabled');
  return parts.join(', ');
}

const DAY_SIZE = 40;

const styles = StyleSheet.create({
  dayWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  dayContainer: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DAY_SIZE / 2,
  },
  dayText: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedDay: {
    borderRadius: DAY_SIZE / 2,
  },
  todayDay: {
    borderWidth: 1,
    borderRadius: DAY_SIZE / 2,
  },
  outsideMonthDay: {
    opacity: 0.4,
  },
  outsideMonthDayText: {},
  marker: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 2,
  },
});
