import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type {
  CalendarLocale,
  CalendarStyles,
  CalendarTheme,
} from '../../types';
import { defaultTheme } from '../../theme/defaultTheme';
import { getLocale } from '../../locale';

export type NepaliCalendarWeekdaysProps = {
  locale: CalendarLocale;
  weekStartsOn: 0 | 1 | 6;
  theme: CalendarTheme;
  calendarStyles: CalendarStyles | undefined;
};

function NepaliCalendarWeekdaysInner(props: NepaliCalendarWeekdaysProps) {
  const { locale, weekStartsOn, theme, calendarStyles } = props;
  const mergedTheme = { ...defaultTheme, ...theme };
  const localeData = getLocale(locale);

  // Rotate weekday labels based on weekStartsOn.
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    labels.push(localeData.weekdaysShort[dayIndex]!);
  }

  return (
    <View style={[styles.weekdayRow, calendarStyles?.weekdayRow]}>
      {labels.map((label, index) => (
        <View key={index} style={styles.weekdayCell}>
          <Text
            style={[
              styles.weekdayText,
              { color: mergedTheme.weekdayTextColor },
              calendarStyles?.weekdayText,
            ]}
          >
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}

export const NepaliCalendarWeekdays = memo(NepaliCalendarWeekdaysInner);

const styles = StyleSheet.create({
  weekdayRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
