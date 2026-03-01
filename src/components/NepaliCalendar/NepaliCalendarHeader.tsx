import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type {
  CalendarAccessibility,
  CalendarLocale,
  CalendarNumeral,
  CalendarStyles,
  CalendarTheme,
  RenderHeaderParams,
} from '../../types';
import { defaultTheme } from '../../theme/defaultTheme';
import { getLocale, toLocalNumeral } from '../../locale';

export type NepaliCalendarHeaderProps = {
  bsYear: number;
  bsMonth: number;
  locale: CalendarLocale;
  numeral: CalendarNumeral;
  theme: CalendarTheme;
  calendarStyles: CalendarStyles | undefined;
  canGoToPreviousMonth: boolean;
  canGoToNextMonth: boolean;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  accessibility: CalendarAccessibility | undefined;
  renderHeader?: (params: RenderHeaderParams) => React.ReactNode;
};

function NepaliCalendarHeaderInner(props: NepaliCalendarHeaderProps) {
  const {
    bsYear,
    bsMonth,
    locale,
    numeral,
    theme,
    calendarStyles,
    canGoToPreviousMonth,
    canGoToNextMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    accessibility,
    renderHeader,
  } = props;

  const localeData = getLocale(locale);
  const monthLabel = `${localeData.months[bsMonth - 1] ?? ''} ${toLocalNumeral(
    bsYear,
    numeral
  )}`;

  // Custom header renderer.
  if (renderHeader) {
    return (
      <>
        {renderHeader({
          bsYear,
          bsMonth,
          monthLabel,
          canGoToPreviousMonth,
          canGoToNextMonth,
          goToPreviousMonth,
          goToNextMonth,
          goToToday,
        })}
      </>
    );
  }

  const mergedTheme = { ...defaultTheme, ...theme };

  return (
    <View style={[styles.header, calendarStyles?.header]}>
      <Pressable
        onPress={goToPreviousMonth}
        disabled={!canGoToPreviousMonth}
        accessibilityRole="button"
        accessibilityLabel={
          accessibility?.previousMonthButtonLabel ?? localeData.previousMonth
        }
        style={[
          styles.navButton,
          !canGoToPreviousMonth && styles.navButtonDisabled,
        ]}
        hitSlop={8}
      >
        <Text
          style={[
            styles.navButtonText,
            { color: mergedTheme.headerTextColor },
            !canGoToPreviousMonth && { color: mergedTheme.disabledTextColor },
          ]}
        >
          ‹
        </Text>
      </Pressable>

      <Pressable
        onPress={goToToday}
        accessibilityRole="button"
        accessibilityLabel={
          accessibility?.todayButtonLabel ?? localeData.goToToday
        }
        style={styles.headerTextContainer}
      >
        <Text
          style={[
            styles.headerText,
            { color: mergedTheme.headerTextColor },
            calendarStyles?.headerText,
          ]}
        >
          {monthLabel}
        </Text>
      </Pressable>

      <Pressable
        onPress={goToNextMonth}
        disabled={!canGoToNextMonth}
        accessibilityRole="button"
        accessibilityLabel={
          accessibility?.nextMonthButtonLabel ?? localeData.nextMonth
        }
        style={[
          styles.navButton,
          !canGoToNextMonth && styles.navButtonDisabled,
        ]}
        hitSlop={8}
      >
        <Text
          style={[
            styles.navButtonText,
            { color: mergedTheme.headerTextColor },
            !canGoToNextMonth && { color: mergedTheme.disabledTextColor },
          ]}
        >
          ›
        </Text>
      </Pressable>
    </View>
  );
}

export const NepaliCalendarHeader = memo(NepaliCalendarHeaderInner);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
