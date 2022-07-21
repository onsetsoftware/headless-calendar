import { Day } from "./Day";
import { PlainDate } from "./PlainDate";
export declare class Calendar {
    protected readonly startDate: PlainDate;
    protected readonly endDate: PlainDate;
    protected readonly startWeekDayIndex: number;
    constructor(startDateStr: string, endDateStr: string, startWeekDayIndex?: number);
    get length(): number;
    get weekDayNames(): any[];
    get maxWeekAxisIndex(): number;
    get days(): Day[];
    /**
     * @param {Boolean} names - determines whether month and year names are written
     * @param {String}  s     - separator between dates
     */
    toString(names?: boolean, s?: string): string;
    [Symbol.iterator](): {
        curDate: PlainDate;
        curLength: number;
        next(): {
            done: boolean;
            value: {
                value: Day;
                done: boolean;
            };
        };
    };
}
