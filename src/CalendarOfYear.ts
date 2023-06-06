import { Calendar } from "./Calendar";
import { DayOfTheWeek } from "./Day";

export class CalendarOfYear extends Calendar {
  constructor(
    year: number,
    startWeekDayIndex: DayOfTheWeek = 0,
    locale?: Intl.LocalesArgument,
  ) {
    let startDateStr = `${year}-1-1`;
    let endDateStr = `${year}-12-31`;

    super(startDateStr, endDateStr, startWeekDayIndex, locale);
  }
}
