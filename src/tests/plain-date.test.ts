import { describe, expect, test } from "vitest";
import { PlainDate } from "../PlainDate";

describe("Plain Date Tests", () => {
  test("Plain Date to string works correctly", () => {
    const plain = new PlainDate("2022-07-21");
    expect(plain.toString()).toBe("2022-07-21");

    const staticPlain = PlainDate.create(2022, 7, 21);
    expect(staticPlain.toString()).toBe("2022-07-21");
  });

  test("Plain Date next returns the next date", () => {
    const plain = new PlainDate("2022-07-21");
    expect(plain.next().toString()).toBe("2022-07-22");

    const staticPlain = PlainDate.create(2022, 7, 31);
    expect(staticPlain.next().toString()).toBe("2022-08-01");
  });

  test("Next works when it is a leap year", () => {
    // non-leap year
    const plain = new PlainDate("2022-02-28");
    expect(plain.next().toString()).toBe("2022-03-01");

    // leap year
    const plain2 = new PlainDate("2020-02-28");
    expect(plain2.next().toString()).toBe("2020-02-29");
  });

  test("Next works when there are daylight savings changes", () => {
    // spring forward
    const plain = new PlainDate("2022-03-26");
    expect(plain.next().toString()).toBe("2022-03-27");
    expect(plain.next().next().toString()).toBe("2022-03-28");
    expect(plain.next().next().next().toString()).toBe("2022-03-29");

    // fall back
    const plain2 = new PlainDate("2022-10-29");
    expect(plain2.next().toString()).toBe("2022-10-30");
    expect(plain2.next().next().toString()).toBe("2022-10-31");
    expect(plain2.next().next().next().toString()).toBe("2022-11-01");
  });

  test("adding arbitrary number of days works", () => {
    // spring forward
    const plain = new PlainDate("2022-03-26");
    expect(plain.addDays(200).toString()).toBe("2022-10-12");
  });

  test("subtracting arbitrary number of days works", () => {
    // spring forward
    const plain = new PlainDate("2022-03-26");
    expect(plain.subDays(200).toString()).toBe("2021-09-07");
  });

  test("Plain Date previous returns the previous date", () => {
    const plain = new PlainDate("2022-07-21");
    expect(plain.previous().toString()).toBe("2022-07-20");

    const staticPlain = PlainDate.create(2022, 8, 1);
    expect(staticPlain.previous().toString()).toBe("2022-07-31");
  });

  test("Plain Date diff works", () => {
    const plain = new PlainDate("2022-07-21");
    const plain2 = new PlainDate("2022-07-23");
    expect(plain.diff(plain2)).toBe(2);

    expect(plain.diff(plain)).toBe(0);

    const staticPlain = PlainDate.create(2022, 8, 1);
    expect(staticPlain.diff(staticPlain.previous())).toBe(-1);
  });

  test("is before works", () => {
    const plain = new PlainDate("2022-07-21");
    const plain2 = new PlainDate("2022-07-23");
    expect(plain.isBefore(plain2)).toBe(true);
    expect(plain2.isBefore(plain)).toBe(false);

    expect(plain.isBefore(plain)).toBe(false);
  });

  test("is after works", () => {
    const plain = new PlainDate("2022-07-21");
    const plain2 = new PlainDate("2022-07-23");
    expect(plain.isAfter(plain2)).toBe(false);
    expect(plain2.isAfter(plain)).toBe(true);

    expect(plain.isAfter(plain)).toBe(false);
  });
});
