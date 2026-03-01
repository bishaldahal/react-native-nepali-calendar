# @bishaldahal/react-native-nepali-calendar

A customizable Nepali calendar component for React Native with Bikram Sambat (BS) date support.

- **Pure JS/TS** — no native code required
- **Expo compatible** — works with Expo Go and managed workflow
- **Full BS ↔ AD conversion** — accurate date conversion with lookup tables (2000–2090 BS)
- **Localization** — Nepali and English labels and numerals
- **Accessible** — built-in accessibility labels and roles
- **Customizable** — themes, style overrides, custom day/header renderers
- **Controlled & uncontrolled** — flexible state management

## Installation

```sh
npm install @bishaldahal/react-native-nepali-calendar
# or
yarn add @bishaldahal/react-native-nepali-calendar
```

No native setup or linking is required. This library is pure JavaScript/TypeScript.

## Quick Start

```tsx
import { NepaliCalendar } from '@bishaldahal/react-native-nepali-calendar';

export default function App() {
  return (
    <NepaliCalendar
      onChange={(date) => console.log('Selected:', date)}
    />
  );
}
```

## Controlled Usage

```tsx
import { useState } from 'react';
import { NepaliCalendar, type CalendarDate } from '@bishaldahal/react-native-nepali-calendar';

export default function App() {
  const [selected, setSelected] = useState<CalendarDate | undefined>();

  return (
    <NepaliCalendar
      value={selected}
      onChange={setSelected}
      locale="ne"
      numeral="ne"
      showAdjacentMonths
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `CalendarDate` | — | Controlled selected date |
| `defaultValue` | `CalendarDate` | — | Initial selected date (uncontrolled) |
| `onChange` | `(date: CalendarDate) => void` | — | Called when selected date changes |
| `visibleMonth` | `CalendarMonth` | — | Controlled visible month |
| `defaultVisibleMonth` | `CalendarMonth` | — | Initial visible month (uncontrolled) |
| `onVisibleMonthChange` | `(month: CalendarMonth) => void` | — | Called when visible month changes |
| `selectionMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection mode (only `single` fully supported) |
| `locale` | `'en' \| 'ne'` | `'en'` | Language for labels |
| `numeral` | `'en' \| 'ne'` | `'en'` | Numeral system for numbers |
| `weekStartsOn` | `0 \| 1 \| 6` | `0` | First day of the week (0=Sun) |
| `minDate` | `CalendarDate` | — | Minimum selectable date |
| `maxDate` | `CalendarDate` | — | Maximum selectable date |
| `disabled` | `boolean` | `false` | Disables all interactions |
| `disablePastDates` | `boolean` | `false` | Disables dates before today |
| `disableFutureDates` | `boolean` | `false` | Disables dates after today |
| `disabledDates` | `CalendarDate[]` | — | Explicit list of disabled dates |
| `isDateDisabled` | `(date: CalendarDate) => boolean` | — | Custom disable logic |
| `markedDates` | `MarkedDate[]` | — | Dates with visual markers |
| `showHeader` | `boolean` | `true` | Show month/year header |
| `showWeekdays` | `boolean` | `true` | Show weekday labels |
| `showAdjacentMonths` | `boolean` | `false` | Show adjacent month days |
| `showTodayHighlight` | `boolean` | `true` | Highlight today's date |
| `theme` | `CalendarTheme` | — | Semantic theme tokens |
| `styles` | `CalendarStyles` | — | Fine-grained style overrides |
| `style` | `StyleProp<ViewStyle>` | — | Outer container style |
| `renderDay` | `(params: RenderDayParams) => ReactNode` | — | Custom day cell renderer |
| `renderHeader` | `(params: RenderHeaderParams) => ReactNode` | — | Custom header renderer |
| `accessibility` | `CalendarAccessibility` | — | Accessibility labels |
| `getDayAccessibilityLabel` | `(date: CalendarDate) => string` | — | Custom day a11y label |
| `testID` | `string` | `'nepali-calendar'` | Test ID for the root |
| `dayTestIDPrefix` | `string` | `'calendar-day'` | Prefix for day cell test IDs |

## Utility Functions

The package also exports utility functions for working with BS dates:

```ts
import {
  adToBs,       // Convert AD Date to BS CalendarDate
  bsToAd,       // Convert BS CalendarDate to AD Date
  compareDates,  // Compare two BS dates (-1, 0, 1)
  isSameDate,    // Check if two BS dates are equal
  isDateInRange, // Check if a date is within a range
  isValidBsDate, // Validate a BS date
  formatBsDate,  // Format a BS date as a string
  toLocalNumeral, // Convert numbers to Nepali numerals
} from '@bishaldahal/react-native-nepali-calendar';
```

### Examples

```ts
// Convert today to BS
const today = adToBs(new Date());
// { bsYear: 2082, bsMonth: 11, bsDay: 17 }

// Convert BS to AD
const adDate = bsToAd({ bsYear: 2082, bsMonth: 1, bsDay: 1 });
// 2025-04-14

// Format a BS date
formatBsDate({ bsYear: 2082, bsMonth: 1, bsDay: 15 }, { locale: 'ne', numeral: 'ne' });
// "१५ बैशाख, २०८२"

// Nepali numerals
toLocalNumeral(2082, 'ne'); // "२०८२"
```

## BS Date Conversion

The library includes accurate BS calendar data for years **2000–2090 BS** (approximately 1943–2034 AD). Dates outside this range will throw a `RangeError`.

The conversion is based on the standard Nepali calendar month-length lookup tables. The architecture is designed so the data range can be extended by adding entries to the lookup table without changing any public API.

## Theming

```tsx
<NepaliCalendar
  theme={{
    backgroundColor: '#1A1A2E',
    headerTextColor: '#FFFFFF',
    weekdayTextColor: '#AAAAAA',
    dayTextColor: '#FFFFFF',
    todayBorderColor: '#E94560',
    selectedBgColor: '#E94560',
    selectedTextColor: '#FFFFFF',
    disabledTextColor: '#555555',
    markerColor: '#E94560',
  }}
/>
```

Style precedence: base styles → theme tokens → `styles` overrides → `style` (container).

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
