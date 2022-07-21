// date is a PlainDate
import { PlainDate } from "./PlainDate";

export function getDayOfTheWeek(date: PlainDate): number {
  return date.toJSDate().getUTCDay();
}

export function getDayAxisIndex(date: PlainDate, swdi: number): number {
  const di = date.toJSDate().getUTCDay();
  return (swdi <= di ? 0 : 7) + di - swdi;
}

export function getMaxWeekAxisIndex(
  startDate: PlainDate,
  endDate: PlainDate,
  swdi: number
): number {
  return (
    Math.ceil(
      (getDayAxisIndex(startDate, swdi) + (startDate.diff(endDate) + 1)) / 7
    ) - 1
  );
}

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function rotateArray(arr: any[], n: number): any[] {
  n = n % arr.length;
  return arr.slice(n, arr.length).concat(arr.slice(0, n));
}

export function getWeekDayNames(swdi: number) {
  return rotateArray(dayNames, swdi);
}
