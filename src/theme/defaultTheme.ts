import type { CalendarTheme } from '../types';

/**
 * Default semantic theme tokens for the calendar.
 *
 * These provide a clean, neutral appearance out of the box.
 * Users can override any token via the `theme` prop.
 */
export const defaultTheme: Required<CalendarTheme> = {
  backgroundColor: '#FFFFFF',
  headerTextColor: '#1A1A1A',
  weekdayTextColor: '#666666',
  dayTextColor: '#1A1A1A',
  todayBorderColor: '#2196F3',
  selectedBgColor: '#2196F3',
  selectedTextColor: '#FFFFFF',
  disabledTextColor: '#CCCCCC',
  markerColor: '#2196F3',
};
