import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Represents a Bikram Sambat (BS) calendar date.
 *
 * This is the core date value used by the calendar component.
 * It intentionally contains only BS fields so the component
 * has a single source of truth for date state.
 *
 * Month numbering is expected to be 1-based:
 * - 1 = Baisakh
 * - 2 = Jestha
 * - ...
 * - 12 = Chaitra
 */
export type CalendarDate = {
  /** Bikram Sambat year, for example 2082. */
  bsYear: number;
  /** Bikram Sambat month number from 1 to 12. */
  bsMonth: number;
  /** Day of the month starting from 1. */
  bsDay: number;
};

/**
 * Represents a visible month in the calendar.
 *
 * This is used when controlling which month the calendar
 * is currently displaying, independent of the selected date.
 */
export type CalendarMonth = {
  /** Bikram Sambat year, for example 2082. */
  bsYear: number;
  /** Bikram Sambat month number from 1 to 12. */
  bsMonth: number;
};

/**
 * Supported language options for built-in labels.
 *
 * - `ne` uses Nepali labels
 * - `en` uses English labels
 */
export type CalendarLocale = 'ne' | 'en';

/**
 * Supported numeral display systems.
 *
 * - `ne` uses Nepali numerals
 * - `en` uses English numerals
 */
export type CalendarNumeral = 'ne' | 'en';

/**
 * Selection mode supported by the calendar.
 *
 * `single` is the main mode for standard date picking.
 * `multiple` and `range` may be supported later without
 * changing the public prop API.
 */
export type CalendarSelectionMode = 'single' | 'multiple' | 'range';

/**
 * Describes a date that should be visually marked in the calendar.
 *
 * Marked dates can be used for events, holidays, reminders,
 * deadlines, or any custom highlighted state.
 */
export type MarkedDate = {
  /** The BS date to be marked. */
  date: CalendarDate;
  /**
   * Visual marker style.
   *
   * - `dot`: small indicator under or beside the date
   * - `filled`: filled background
   * - `outlined`: outlined day cell
   */
  variant?: 'dot' | 'filled' | 'outlined';
  /** Optional marker color. */
  color?: string;
  /** Optional text color for the marked date. */
  textColor?: string;
  /** Whether this marked date should also be non-interactive. */
  disabled?: boolean;
  /** Optional label or metadata for future use. */
  label?: string;
};

/**
 * Semantic theme tokens for the calendar.
 *
 * These values control the visual appearance of common states
 * without requiring full custom rendering.
 */
export type CalendarTheme = {
  /** Background color of the calendar container. */
  backgroundColor?: string;
  /** Text color used for the month/year header. */
  headerTextColor?: string;
  /** Text color used for weekday labels. */
  weekdayTextColor?: string;
  /** Default text color used for day numbers. */
  dayTextColor?: string;
  /** Border or highlight color used for today's date. */
  todayBorderColor?: string;
  /** Background color used for the selected date. */
  selectedBgColor?: string;
  /** Text color used for the selected date. */
  selectedTextColor?: string;
  /** Text color used for disabled dates. */
  disabledTextColor?: string;
  /** Default color used for markers such as dots. */
  markerColor?: string;
};

/**
 * Fine-grained style overrides for specific calendar parts.
 *
 * Use this when theme tokens are not enough and you need
 * direct React Native style control.
 */
export type CalendarStyles = {
  /** Style for the root calendar container. */
  container?: StyleProp<ViewStyle>;
  /** Style for the header wrapper. */
  header?: StyleProp<ViewStyle>;
  /** Style for the header text. */
  headerText?: StyleProp<TextStyle>;
  /** Style for the weekday row container. */
  weekdayRow?: StyleProp<ViewStyle>;
  /** Style for weekday label text. */
  weekdayText?: StyleProp<TextStyle>;
  /** Style for each day cell. */
  day?: StyleProp<ViewStyle>;
  /** Style for each day text. */
  dayText?: StyleProp<TextStyle>;
  /** Style for the selected day cell. */
  selectedDay?: StyleProp<ViewStyle>;
  /** Style for the selected day text. */
  selectedDayText?: StyleProp<TextStyle>;
  /** Style for today's day cell. */
  todayDay?: StyleProp<ViewStyle>;
  /** Style for disabled day text. */
  disabledDayText?: StyleProp<TextStyle>;
  /** Style for day cells outside the current month. */
  outsideMonthDay?: StyleProp<ViewStyle>;
  /** Style for text of day cells outside the current month. */
  outsideMonthDayText?: StyleProp<TextStyle>;
  /** Style for marked day cell when using non-custom render modes. */
  markedDay?: StyleProp<ViewStyle>;
  /** Style for the marker element such as a dot. */
  marker?: StyleProp<ViewStyle>;
};

/**
 * Accessibility-related labels and helpers.
 */
export type CalendarAccessibility = {
  /** Spoken label for the previous month navigation button. */
  previousMonthButtonLabel?: string;
  /** Spoken label for the next month navigation button. */
  nextMonthButtonLabel?: string;
  /** Spoken label for the jump-to-today button. */
  todayButtonLabel?: string;
};
