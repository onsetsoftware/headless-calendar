import { DateString, DayOfMonth, Month } from "./types/date-string";
import { monthNames } from "./utils";

export function createDate(
  dateStr: DateString = PlainDate.today().toString(),
  locale?: Intl.LocalesArgument,
) {
  return new PlainDate(dateStr, locale);
}

export class PlainDate {
  readonly year: number;
  readonly month: Month;
  readonly date: DayOfMonth<Month>;

  constructor(
    dateStr: DateString = PlainDate.today().toString() as DateString,
    protected locale?: Intl.LocalesArgument,
  ) {
    const [year, month, date] = dateStr.split("-").map((s) => Number(s));
    this.year = year;
    this.month = month as Month;
    this.date = date as DayOfMonth<Month>;
  }

  static create<M extends Month>(
    year: number,
    month: M,
    day: DayOfMonth<M>,
    locale?: Intl.LocalesArgument,
  ): PlainDate {
    return new PlainDate([year, month, day].join("-") as DateString, locale);
  }

  get monthName() {
    return monthNames(this.locale)[this.month - 1];
  }

  toJSDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.date));
  }

  equals(another: PlainDate): boolean {
    return Boolean(
      this.year == another.year &&
        this.month == another.month &&
        this.date == another.date,
    );
  }

  isBefore(another: PlainDate): boolean {
    return this.diff(another) > 0;
  }

  isAfter(another: PlainDate): boolean {
    return this.diff(another) < 0;
  }

  diff(another: PlainDate): number {
    return (
      (another.toJSDate().getTime() - this.toJSDate().getTime()) / 86400000
    );
  }

  next(): PlainDate {
    return this.addDays(1);
  }

  previous() {
    return this.subDays(1);
  }

  addDays(days: number): PlainDate {
    return PlainDate.fromJSDate(
      new Date(this.toJSDate().getTime() + 1000 * 60 * 60 * 24 * days),
    );
  }

  subDays(days: number): PlainDate {
    return PlainDate.fromJSDate(
      new Date(this.toJSDate().getTime() - 1000 * 60 * 60 * 24 * days),
    );
  }

  toString() {
    return [
      this.year,
      String(this.month).padStart(2, "0"),
      String(this.date).padStart(2, "0"),
    ].join("-") as DateString;
  }

  static fromJSDate(
    date: Date,
    UTC = true,
    locale?: Intl.LocalesArgument,
  ): PlainDate {
    return new PlainDate(
      (UTC
        ? `${date.getUTCFullYear()}-${
            date.getUTCMonth() + 1
          }-${date.getUTCDate()}`
        : `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`) as DateString,
      locale,
    );
  }

  static today(UTC: boolean = true, locale?: Intl.LocalesArgument): PlainDate {
    const date = new Date();
    return PlainDate.fromJSDate(date, UTC, locale);
  }
}
