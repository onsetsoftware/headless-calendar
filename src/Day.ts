import { PlainDate } from "./PlainDate";

export type DayOfTheWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class Day {
  constructor(
    public readonly date: PlainDate,
    public readonly dayNumber: number,
    public readonly dayOfTheWeek: DayOfTheWeek,
    public readonly dayAxisIndex: DayOfTheWeek,
    public readonly weekAxisIndex: number,
  ) {}

  isFirstDayOfWeekAndMonth() {
    const date = this.date.toJSDate().getUTCDate();
    return this.dayAxisIndex === 0 && date >= 1 && date <= 7;
  }
}
