import { monthNames } from "./utils";

export class PlainDate {
  readonly year: number;
  readonly month: number;
  readonly date: number;

  constructor(dateStr: string = PlainDate.today().toString()) {
    const [year, month, date] = dateStr.split("-").map((s) => Number(s));
    this.year = year;
    this.month = month;
    this.date = date;
  }

  static create(year: number, month: number, day: number): PlainDate {
    return new PlainDate([year, month, day].join("-"));
  }

  get monthName() {
    return monthNames[this.month - 1];
  }

  toJSDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.date));
  }

  equals(another: PlainDate): boolean {
    return Boolean(
      this.year == another.year &&
        this.month == another.month &&
        this.date == another.date
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
      new Date(this.toJSDate().getTime() + 1000 * 60 * 60 * 24 * days)
    );
  }

  subDays(days: number): PlainDate {
    return PlainDate.fromJSDate(
      new Date(this.toJSDate().getTime() - 1000 * 60 * 60 * 24 * days)
    );
  }

  toString(): string {
    return [
      this.year,
      String(this.month).padStart(2, "0"),
      String(this.date).padStart(2, "0"),
    ].join("-");
  }

  static fromJSDate(date: Date, UTC = true): PlainDate {
    return new PlainDate(
      UTC
        ? `${date.getUTCFullYear()}-${
            date.getUTCMonth() + 1
          }-${date.getUTCDate()}`
        : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }

  static today(UTC: boolean = true): PlainDate {
    const date = new Date();
    return PlainDate.fromJSDate(date, UTC);
  }
}
