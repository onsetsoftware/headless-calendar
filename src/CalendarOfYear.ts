import { Calendar } from "./Calendar";
import { DayOfTheWeek } from "./Day";
import { DateString } from "./types/date-string";

export class CalendarOfYear extends Calendar {
  constructor(
    year: number,
    startWeekDayIndex: DayOfTheWeek = 0,
    locale?: Intl.LocalesArgument,
  ) {
    let startDateStr = `${year}-1-1` as DateString;
    let endDateStr = `${year}-12-31` as DateString;

    super(startDateStr, endDateStr, startWeekDayIndex, locale);
  }
}
