export declare class PlainDate {
    readonly year: number;
    readonly month: number;
    readonly date: number;
    constructor(dateStr?: string);
    static create(year: number, month: number, day: number): PlainDate;
    get monthName(): string;
    toJSDate(): Date;
    equals(another: PlainDate): boolean;
    isBefore(another: PlainDate): boolean;
    isAfter(another: PlainDate): boolean;
    diff(another: PlainDate): number;
    next(): PlainDate;
    previous(): PlainDate;
    toString(): string;
    static fromJSDate(date: Date, UTC?: boolean): PlainDate;
    static today(UTC?: boolean): PlainDate;
}
