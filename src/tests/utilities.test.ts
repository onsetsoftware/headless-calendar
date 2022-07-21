import { describe, expect, test } from "vitest";
import { getDayOfTheWeek, getWeekDayNames, rotateArray } from "../utils";
import { PlainDate } from "../PlainDate";

describe("Utilities Tests", () => {
  test("rotating an array functions correctly", () => {
    expect(rotateArray([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);
  });

  test("correct weekday order is returned", () => {
    expect(getWeekDayNames(0)).toEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);

    expect(getWeekDayNames(3)).toEqual([
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
    ]);
  });

  test("Day Of the Week Number is calculated correctly", () => {
    expect(getDayOfTheWeek(PlainDate.create(2022, 7, 21))).toBe(4);
  });
});
