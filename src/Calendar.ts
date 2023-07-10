import { Day, DayOfTheWeek } from "./Day";
import { PlainDate } from "./PlainDate";
import { DateString } from "./types/date-string";
import {
  getWeekDayNames,
  getDayAxisIndex,
  getMaxWeekAxisIndex,
  monthNames,
  getDayOfTheWeek,
} from "./utils";

export class Calendar {
  public readonly startDate: PlainDate;
  public readonly endDate: PlainDate;
  public readonly startWeekDayIndex: DayOfTheWeek;

  constructor(
    startDateStr: DateString,
    endDateStr: DateString,
    startWeekDayIndex: DayOfTheWeek = 0,
    protected locale?: Intl.LocalesArgument,
  ) {
    this.startDate = new PlainDate(startDateStr, this.locale);
    this.endDate = new PlainDate(endDateStr, this.locale);
    if (this.endDate.isBefore(this.startDate)) {
      const tempDate = this.startDate;

      this.startDate = this.endDate;
      this.endDate = tempDate;
    }

    this.startWeekDayIndex = startWeekDayIndex;
  }

  get length() {
    return this.startDate.diff(this.endDate) + 1;
  }

  get weekDayNames() {
    return getWeekDayNames(this.startWeekDayIndex, this.locale);
  }

  get maxWeekAxisIndex() {
    return getMaxWeekAxisIndex(
      this.startDate,
      this.endDate,
      this.startWeekDayIndex,
    );
  }

  get days(): Day[] {
    return [...this].map((val) => val.value);
  }

  toString(names: boolean = true, s: string = " ") {
    let cal = new Calendar(
      this.startDate.toString(),
      this.endDate.toString(),
      this.startWeekDayIndex,
      this.locale,
    );
    let yMax = this.maxWeekAxisIndex;
    let result = "";

    let wDayNames = cal.weekDayNames.map((name) => name.slice(0, 2));
    result += wDayNames.join(s) + "\n";

    for (let day of cal) {
      let [d, x, y, n] = [
        day.value.date,
        day.value.dayAxisIndex,
        day.value.weekAxisIndex,
        day.value.dayNumber,
      ];

      if (n == 1 && x > 0) {
        result += Array(x).fill("  ").join(s);
      }

      result += (x == 0 ? "" : s) + `${d.date}`.padStart(2);

      if (names) {
        if (y == 0 && x == 6)
          result += ` ${monthNames(this.locale)[d.month - 1]} ${d.year}`;
        if (y > 0 && x == 6 && d.date <= 7) {
          result += ` ${monthNames(this.locale)[d.month - 1]}`;
          if ((d.month as number) === 0) result += ` ${d.year}`;
        }
      }

      result += x === 6 && y !== yMax ? "\n" : "";

      if (d.equals(this.endDate) && x < 6) {
        result +=
          s +
          Array(7 - x - 1)
            .fill("  ")
            .join(s);
      }
    }

    return result;
  }

  [Symbol.iterator]() {
    let startDate = this.startDate;
    let endDate = this.endDate;
    let startWeekDayIndex = this.startWeekDayIndex;
    return {
      curDate: startDate,
      curLength: 1,
      next() {
        const done = this.curDate.equals(endDate.next());
        let value = {
          value: new Day(
            this.curDate,
            this.curLength,
            getDayOfTheWeek(this.curDate),
            getDayAxisIndex(this.curDate, startWeekDayIndex),
            getMaxWeekAxisIndex(startDate, this.curDate, startWeekDayIndex),
          ),
          done: false,
        };
        this.curDate = this.curDate.next();
        this.curLength++;
        return { done, value };
      },
    };
  }
}
