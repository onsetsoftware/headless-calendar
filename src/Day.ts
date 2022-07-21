import { PlainDate } from "./PlainDate";

export class Day {
  constructor(
    public readonly date: PlainDate,
    public readonly dayNumber: number,
    public readonly dayOfTheWeek: number,
    public readonly dayAxisIndex: number,
    public readonly weekAxisIndex: number
  ) {}

  isFirstDayOfWeekAndMonth() {
    const date = this.date.toJSDate().getUTCDate();
    return this.dayAxisIndex == 0 && date >= 1 && date <= 7;
  }
}
