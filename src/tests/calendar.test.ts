import { describe, expect, test } from "vitest";
import { CalendarOfMonth } from "../CalendarOfMonth";

describe("Calendar Tests", () => {
  test("Month Calendar String shows correctly", () => {
    const calendar = new CalendarOfMonth(2022, 7, 0);

    expect(calendar.toString(false)).toBe(
      "Su Mo Tu We Th Fr Sa\n" +
        "                1  2\n" +
        " 3  4  5  6  7  8  9\n" +
        "10 11 12 13 14 15 16\n" +
        "17 18 19 20 21 22 23\n" +
        "24 25 26 27 28 29 30\n" +
        "31                  "
    );

    const calendar2 = new CalendarOfMonth(2022, 7, 3);

    expect(calendar2.toString()).toBe(
      "      July 2022     \n" +
        "We Th Fr Sa Su Mo Tu\n" +
        "       1  2  3  4  5\n" +
        " 6  7  8  9 10 11 12\n" +
        "13 14 15 16 17 18 19\n" +
        "20 21 22 23 24 25 26\n" +
        "27 28 29 30 31      "
    );
  });
});
