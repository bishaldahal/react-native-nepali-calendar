import { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import {
  NepaliCalendar,
  adToBs,
  formatBsDate,
  type CalendarDate,
  type CalendarLocale,
  type CalendarNumeral,
} from '@bishaldahal/react-native-nepali-calendar';

const today = adToBs(new Date());

const MARKED_DATES = [
  {
    date: { bsYear: today.bsYear, bsMonth: today.bsMonth, bsDay: 5 },
    variant: 'dot' as const,
    label: 'Event',
  },
  {
    date: { bsYear: today.bsYear, bsMonth: today.bsMonth, bsDay: 10 },
    variant: 'filled' as const,
    color: '#E91E63',
    label: 'Holiday',
  },
  {
    date: { bsYear: today.bsYear, bsMonth: today.bsMonth, bsDay: 20 },
    variant: 'outlined' as const,
    color: '#4CAF50',
    label: 'Deadline',
  },
];

const DISABLED_DATES = [
  { bsYear: today.bsYear, bsMonth: today.bsMonth, bsDay: 7 },
  { bsYear: today.bsYear, bsMonth: today.bsMonth, bsDay: 14 },
];

export default function App() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | undefined>();
  const [locale, setLocale] = useState<CalendarLocale>('en');
  const [numeral, setNumeral] = useState<CalendarNumeral>('en');

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'ne' : 'en'));
  }, []);

  const toggleNumeral = useCallback(() => {
    setNumeral((prev) => (prev === 'en' ? 'ne' : 'en'));
  }, []);

  const formattedDate = selectedDate
    ? formatBsDate(selectedDate, { locale, numeral, format: 'full' })
    : 'None';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Nepali Calendar Demo</Text>

        <View style={styles.controls}>
          <Pressable style={styles.button} onPress={toggleLocale}>
            <Text style={styles.buttonText}>
              Locale: {locale.toUpperCase()}
            </Text>
          </Pressable>
          <Pressable style={styles.button} onPress={toggleNumeral}>
            <Text style={styles.buttonText}>
              Numeral: {numeral.toUpperCase()}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.selectedLabel}>Selected: {formattedDate}</Text>

        <View style={styles.calendarContainer}>
          <NepaliCalendar
            value={selectedDate}
            onChange={setSelectedDate}
            locale={locale}
            numeral={numeral}
            markedDates={MARKED_DATES}
            disabledDates={DISABLED_DATES}
            showAdjacentMonths
            showTodayHighlight
            theme={{
              selectedBgColor: '#1976D2',
              todayBorderColor: '#1976D2',
            }}
          />
        </View>

        <Text style={styles.sectionTitle}>Minimal (defaults)</Text>
        <View style={styles.calendarContainer}>
          <NepaliCalendar />
        </View>

        <Text style={styles.sectionTitle}>Disabled Calendar</Text>
        <View style={styles.calendarContainer}>
          <NepaliCalendar disabled />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedLabel: {
    textAlign: 'center',
    fontSize: 15,
    color: '#444',
    marginBottom: 16,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
});
