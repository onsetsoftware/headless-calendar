// date is a PlainDate
import { DayOfTheWeek } from "./Day";
import { PlainDate } from "./PlainDate";

export function getDayOfTheWeek(date: PlainDate) {
  return date.toJSDate().getUTCDay() as DayOfTheWeek;
}

export function getDayAxisIndex(
  date: PlainDate,
  startWeekDayIndex: DayOfTheWeek,
) {
  const di = getDayOfTheWeek(date);
  return ((startWeekDayIndex <= di ? 0 : 7) +
    di -
    startWeekDayIndex) as DayOfTheWeek;
}

export function getMaxWeekAxisIndex(
  startDate: PlainDate,
  endDate: PlainDate,
  startWeekDayIndex: DayOfTheWeek,
) {
  return (
    Math.ceil(
      (getDayAxisIndex(startDate, startWeekDayIndex) +
        (Math.abs(startDate.diff(endDate)) + 1)) /
        7,
    ) - 1
  );
}

export function monthNames(locale?: Intl.LocalesArgument) {
  // Get the current date
  const currentDate = new Date();

  // Array of month names in the local language
  const months = [];

  // Loop through each month
  for (let i = 0; i < 12; i++) {
    // Set the month
    currentDate.setMonth(i);

    // Get the name of the current month in the local language
    const monthName = currentDate.toLocaleDateString(locale, {
      month: "long",
    });

    // Add the month name to the array
    months.push(monthName);
  }

  return months;
}

export function dayNames(locale?: Intl.LocalesArgument) {
  const currentDate = new Date();

  // Array of weekday names in the local language
  const weekdays = [];

  // Find the index of "Sunday" in the weekday names
  let firstDayIndex = 7 - currentDate.getDay();

  // Loop through each day of the week
  for (let i = 0; i < 7; i++) {
    // Set the day of the week based on the repositioned index
    const dayIndex = (firstDayIndex + i) % 7;
    const testDate = new Date();
    testDate.setDate(currentDate.getDate() + dayIndex);

    // Get the name of the current weekday in the local language
    const weekdayName = testDate.toLocaleDateString(locale, {
      weekday: "long",
    });

    // Add the weekday name to the array
    weekdays.push(weekdayName);
  }

  return weekdays;
}

export function rotateArray<T>(arr: T[], n: number): T[] {
  n = n % arr.length;
  return arr.slice(n, arr.length).concat(arr.slice(0, n));
}

export function getWeekDayNames(
  startWeekDayIndex: number,
  locale?: Intl.LocalesArgument,
) {
  return rotateArray(dayNames(locale), startWeekDayIndex);
}
