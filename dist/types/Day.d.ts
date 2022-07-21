import { PlainDate } from "./PlainDate";
export declare class Day {
    readonly date: PlainDate;
    readonly dayNumber: number;
    readonly dayOfTheWeek: number;
    readonly dayAxisIndex: number;
    readonly weekAxisIndex: number;
    constructor(date: PlainDate, dayNumber: number, dayOfTheWeek: number, dayAxisIndex: number, weekAxisIndex: number);
    isFirstDayOfWeekAndMonth(): boolean;
}
