import { Calendar } from "./Calendar";
export declare class CalendarOfMonth extends Calendar {
    constructor(year: number, month: number, startWeekDayIndex?: number);
    toString(showTitle?: boolean, s?: string): string;
}
