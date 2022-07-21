import { Day } from "./Day";
import { PlainDate } from "./PlainDate";
import {
  getWeekDayNames,
  getDayAxisIndex,
  getMaxWeekAxisIndex,
  monthNames,
  getDayOfTheWeek,
} from "./utils";

export class Calendar {
  protected readonly startDate: PlainDate;
  protected readonly endDate: PlainDate;
  protected readonly startWeekDayIndex: number;

  constructor(
    startDateStr: string,
    endDateStr: string,
    startWeekDayIndex: number = 0
  ) {
    this.startDate = new PlainDate(startDateStr);
    this.endDate = new PlainDate(endDateStr);
    this.startWeekDayIndex = startWeekDayIndex;
  }

  get length() {
    return this.startDate.diff(this.endDate);
  }

  get weekDayNames() {
    return getWeekDayNames(this.startWeekDayIndex);
  }

  get maxWeekAxisIndex() {
    return getMaxWeekAxisIndex(
      this.startDate,
      this.endDate,
      this.startWeekDayIndex
    );
  }

  get days(): Day[] {
    return [...this].map((val) => val.value);
  }

  /**
   * @param {Boolean} names - determines whether month and year names are written
   * @param {String}  s     - separator between dates
   */
  toString(names = true, s = " ") {
    let cal = new Calendar(
      this.startDate.toString(),
      this.endDate.toString(),
      this.startWeekDayIndex
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
        if (y == 0 && x == 6) result += ` ${monthNames[d.month - 1]} ${d.year}`;
        if (y > 0 && x == 6 && d.date <= 7) {
          result += ` ${monthNames[d.month - 1]}`;
          if (d.month == 0) result += ` ${d.year}`;
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
    let swdi = this.startWeekDayIndex;
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
            getDayAxisIndex(this.curDate, swdi),
            getMaxWeekAxisIndex(startDate, this.curDate, swdi)
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
