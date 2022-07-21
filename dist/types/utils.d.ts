import { PlainDate } from "./PlainDate";
export declare function getDayOfTheWeek(date: PlainDate): number;
export declare function getDayAxisIndex(date: PlainDate, swdi: number): number;
export declare function getMaxWeekAxisIndex(startDate: PlainDate, endDate: PlainDate, swdi: number): number;
export declare const dayNames: string[];
export declare const monthNames: string[];
export declare function rotateArray(arr: any[], n: number): any[];
export declare function getWeekDayNames(swdi: number): any[];
