import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type {
  CalendarAccessibility,
  CalendarDate,
  CalendarLocale,
  CalendarMonth,
  CalendarNumeral,
  CalendarSelectionMode,
  CalendarStyles,
  CalendarTheme,
  MarkedDate,
} from './calendar';

/**
 * Parameters passed to the custom day renderer.
 */
export type RenderDayParams = {
  /** The BS date for the current day cell. */
  date: CalendarDate;
  /** Whether this date is currently selected. */
  isSelected: boolean;
  /** Whether this date represents today. */
  isToday: boolean;
  /** Whether this date is disabled and non-interactive. */
  isDisabled: boolean;
  /** Whether this date is marked. */
  isMarked: boolean;
  /** Whether this date belongs to a previous or next visible month. */
  isOutsideMonth: boolean;
};

/**
 * Parameters passed to the custom header renderer.
 */
export type RenderHeaderParams = {
  /** The currently visible BS year. */
  bsYear: number;
  /** The currently visible BS month. */
  bsMonth: number;
  /** Preformatted visible month label. */
  monthLabel: string;
  /** Whether navigating to the previous month is currently allowed. */
  canGoToPreviousMonth: boolean;
  /** Whether navigating to the next month is currently allowed. */
  canGoToNextMonth: boolean;
  /** Navigate to the previous visible month. */
  goToPreviousMonth: () => void;
  /** Navigate to the next visible month. */
  goToNextMonth: () => void;
  /** Navigate the calendar to the current month. */
  goToToday: () => void;
};

/**
 * Props for the Nepali calendar component.
 */
export type NepaliCalendarProps = {
  /**
   * Controlled selected date.
   *
   * When provided, the parent component fully controls the selected date.
   * In this mode, the calendar should not manage selected date internally.
   *
   * Use together with `onChange`.
   */
  value?: CalendarDate;

  /**
   * Initial selected date for uncontrolled usage.
   *
   * Use this when you want the calendar to manage selected state internally
   * after the first render.
   *
   * Ignored when `value` is provided.
   */
  defaultValue?: CalendarDate;

  /**
   * Called when the selected date changes.
   *
   * Triggered when the user selects a valid, enabled date.
   * In controlled mode, use this callback to update `value`.
   */
  onChange?: (date: CalendarDate) => void;

  /**
   * Controlled visible month.
   *
   * This controls which month is displayed in the calendar UI,
   * independent of the selected date.
   *
   * Use together with `onVisibleMonthChange`.
   */
  visibleMonth?: CalendarMonth;

  /**
   * Initial visible month for uncontrolled usage.
   *
   * If not provided, the component may derive the initial visible month
   * from `value`, `defaultValue`, or the current date.
   *
   * Ignored when `visibleMonth` is provided.
   */
  defaultVisibleMonth?: CalendarMonth;

  /**
   * Called when the visible month changes.
   *
   * This is triggered when the user navigates to a previous or next month,
   * or when month visibility changes programmatically.
   */
  onVisibleMonthChange?: (month: CalendarMonth) => void;

  /**
   * Calendar selection mode.
   *
   * `single` is the standard date selection mode.
   * Other modes may be introduced progressively while keeping the same API.
   *
   * Default: `single`
   */
  selectionMode?: CalendarSelectionMode;

  /**
   * Minimum selectable BS date.
   *
   * Dates before this value should be treated as disabled.
   */
  minDate?: CalendarDate;

  /**
   * Maximum selectable BS date.
   *
   * Dates after this value should be treated as disabled.
   */
  maxDate?: CalendarDate;

  /**
   * Disables all interactions with the calendar.
   *
   * When true, users should not be able to select or navigate.
   */
  disabled?: boolean;

  /**
   * Disables dates before today.
   *
   * This is evaluated relative to the current date.
   * If both this prop and `minDate` are provided, the stricter rule should win.
   */
  disablePastDates?: boolean;

  /**
   * Disables dates after today.
   *
   * This is evaluated relative to the current date.
   * If both this prop and `maxDate` are provided, the stricter rule should win.
   */
  disableFutureDates?: boolean;

  /**
   * Explicit list of disabled dates.
   *
   * Useful for blocking specific dates such as holidays, unavailable slots,
   * or business-specific restrictions.
   */
  disabledDates?: CalendarDate[];

  /**
   * Custom function to determine whether a given date should be disabled.
   *
   * This is useful for dynamic rules such as:
   * - weekends
   * - recurring blocked days
   * - dates fetched from an API
   * - complex validation logic
   */
  isDateDisabled?: (date: CalendarDate) => boolean;

  /**
   * Dates that should be visually marked.
   *
   * Marked dates are typically used for events, reminders, holidays,
   * or other important dates that need visual emphasis.
   */
  markedDates?: MarkedDate[];

  /**
   * Built-in locale used for month names, weekday labels, and other text.
   *
   * Default: `en`
   */
  locale?: CalendarLocale;

  /**
   * Numeral system used when displaying numbers in the calendar.
   *
   * Default: `en`
   */
  numeral?: CalendarNumeral;

  /**
   * First day of the week.
   *
   * Common values:
   * - `0` for Sunday
   * - `1` for Monday
   * - `6` for Saturday
   */
  weekStartsOn?: 0 | 1 | 6;

  /**
   * Whether to render the month header.
   *
   * Default: `true`
   */
  showHeader?: boolean;

  /**
   * Whether to render weekday labels.
   *
   * Default: `true`
   */
  showWeekdays?: boolean;

  /**
   * Whether to show leading and trailing dates from adjacent months.
   *
   * When enabled, days outside the current month may still appear in the grid.
   */
  showAdjacentMonths?: boolean;

  /**
   * Whether to visually highlight today's date.
   *
   * Default: `true`
   */
  showTodayHighlight?: boolean;

  /**
   * Semantic visual theme tokens for common calendar states.
   */
  theme?: CalendarTheme;

  /**
   * Fine-grained style overrides for calendar subparts.
   *
   * Use this prop when you need specific view or text style customization.
   */
  styles?: CalendarStyles;

  /**
   * Style applied to the outermost calendar wrapper.
   *
   * This is useful for layout-related styling such as margin, width, or flex.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom renderer for a day cell.
   *
   * Use this for advanced UI customization of date cells.
   * When provided, the component should still preserve built-in
   * press handling, accessibility, and state semantics where possible.
   */
  renderDay?: (params: RenderDayParams) => ReactNode;

  /**
   * Custom renderer for the calendar header.
   *
   * Use this to replace the default month navigation header with
   * a custom implementation.
   */
  renderHeader?: (params: RenderHeaderParams) => ReactNode;

  /**
   * Accessibility labels for static navigation controls.
   *
   * This is intended for buttons whose spoken label does not depend
   * on a specific date, such as previous/next month navigation.
   */
  accessibility?: CalendarAccessibility;

  /**
   * Returns an accessibility label for an individual day cell.
   *
   * This is used for dynamic date announcements and should typically include:
   * - the full date
   * - whether it is selected
   * - whether it is disabled
   * - whether it is today
   */
  getDayAccessibilityLabel?: (date: CalendarDate) => string;

  /**
   * Test identifier for the root calendar component.
   *
   * Useful for E2E and UI automation tests.
   */
  testID?: string;

  /**
   * Prefix used when generating test IDs for individual day cells.
   *
   * Example generated ID:
   * - `calendar-day-2082-01-01`
   */
  dayTestIDPrefix?: string;
};
