/**
 * Calendar utilities for DatePicker.
 * Week starts on Monday (Danish convention).
 */

/** Number of days in a given month (1-indexed month). */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Day of week for the 1st of a month. 0=Monday, 6=Sunday. */
export function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay();
  // JS: 0=Sunday → convert to 0=Monday
  return day === 0 ? 6 : day - 1;
}

/**
 * Generate a calendar grid for a month.
 * Returns array of weeks, each week is 7 entries (Mon-Sun).
 * null = empty cell (outside this month).
 */
export function getCalendarGrid(
  year: number,
  month: number,
): (number | null)[][] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

/** Format a Date to a display string. */
export function formatCalendarDate(date: Date, format = 'DD/MM/YYYY'): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear());

  return format.replace('DD', d).replace('MM', m).replace('YYYY', y);
}

/** Parse a date string in common formats. Returns null if invalid. */
export function parseDate(value: string): Date | null {
  if (!value) return null;

  // ISO: YYYY-MM-DD
  let match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    const date = new Date(+match[1], +match[2] - 1, +match[3]);
    if (
      date.getFullYear() === +match[1] &&
      date.getMonth() === +match[2] - 1 &&
      date.getDate() === +match[3]
    )
      return date;
    return null;
  }

  // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  match = value.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (match) {
    const date = new Date(+match[3], +match[2] - 1, +match[1]);
    if (
      date.getFullYear() === +match[3] &&
      date.getMonth() === +match[2] - 1 &&
      date.getDate() === +match[1]
    )
      return date;
    return null;
  }

  return null;
}

/** Check if two dates are the same calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Check if a date is between min and max (inclusive). */
export function isDateBetween(date: Date, min: Date, max: Date): boolean {
  const d = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const lo = new Date(
    min.getFullYear(),
    min.getMonth(),
    min.getDate(),
  ).getTime();
  const hi = new Date(
    max.getFullYear(),
    max.getMonth(),
    max.getDate(),
  ).getTime();
  return d >= lo && d <= hi;
}

/** Check if a date is today. */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

const MONTH_NAMES: Record<string, string[]> = {
  da: [
    'Januar',
    'Februar',
    'Marts',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const WEEKDAY_NAMES: Record<string, string[]> = {
  da: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
  en: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
};

const WEEKDAY_SHORT: Record<string, string[]> = {
  da: ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};

/** Get month names for a locale. */
export function getMonthNames(locale = 'da'): string[] {
  return MONTH_NAMES[locale] ?? MONTH_NAMES.da;
}

/** Get weekday names for a locale. */
export function getWeekdayNames(locale = 'da', short = true): string[] {
  if (short) return WEEKDAY_SHORT[locale] ?? WEEKDAY_SHORT.da;
  return WEEKDAY_NAMES[locale] ?? WEEKDAY_NAMES.da;
}
