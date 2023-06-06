import { Calendar } from "./Calendar";
import { DayOfTheWeek } from "./Day";
import { monthNames } from "./utils";

export class CalendarOfMonth extends Calendar {
  constructor(
    year: number,
    month: number,
    startWeekDayIndex: DayOfTheWeek = 0,
    protected locale?: Intl.LocalesArgument,
  ) {
    let startDateStr = `${year}-${month}-1`;
    let endDateStr = `${year}-${month}-${new Date(
      Date.UTC(year, month, 0),
    ).getUTCDate()}`;

    super(startDateStr, endDateStr, startWeekDayIndex, locale);
  }

  toString(showTitle: boolean = true, s = " ") {
    let title = showTitle
      ? `${monthNames(this.locale)[this.startDate.month - 1]} ${
          this.startDate.year
        }`
      : "";
    let cal = super.toString(false, s);
    let calWidth = s.length * 6 + 14;
    let targetPadStartLen = Math.ceil(
      (calWidth - title.length) / 2 + title.length,
    );

    return (
      (showTitle
        ? title.padStart(targetPadStartLen).padEnd(calWidth) + "\n"
        : "") + cal
    );
  }
}
