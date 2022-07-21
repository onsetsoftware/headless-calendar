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
    expect(staticPlain.diff(staticPlain.previous())).toBe(1);
  });
});
