import {Calendar} from "./Calendar";

export class CalendarOfYear extends Calendar {
  constructor(year: number, startWeekDayIndex: number = 0) {
    let startDateStr = `${year}-1-1`;
    let endDateStr = `${year}-12-31`;

    super(startDateStr, endDateStr, startWeekDayIndex);
  }
}

