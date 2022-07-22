class f {
  constructor(t, e, a, n, r) {
    this.date = t, this.dayNumber = e, this.dayOfTheWeek = a, this.dayAxisIndex = n, this.weekAxisIndex = r;
  }
  isFirstDayOfWeekAndMonth() {
    const t = this.date.toJSDate().getUTCDate();
    return this.dayAxisIndex == 0 && t >= 1 && t <= 7;
  }
}
function x(s) {
  return s.toJSDate().getUTCDay();
}
function g(s, t) {
  const e = s.toJSDate().getUTCDay();
  return (t <= e ? 0 : 7) + e - t;
}
function y(s, t, e) {
  return Math.ceil((g(s, e) + (Math.abs(s.diff(t)) + 1)) / 7) - 1;
}
const S = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], d = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function $(s, t) {
  return t = t % s.length, s.slice(t, s.length).concat(s.slice(0, t));
}
function k(s) {
  return $(S, s);
}
class i {
  year;
  month;
  date;
  constructor(t = i.today().toString()) {
    const [e, a, n] = t.split("-").map((r) => Number(r));
    this.year = e, this.month = a, this.date = n;
  }
  static create(t, e, a) {
    return new i([t, e, a].join("-"));
  }
  get monthName() {
    return d[this.month - 1];
  }
  toJSDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.date));
  }
  equals(t) {
    return Boolean(this.year == t.year && this.month == t.month && this.date == t.date);
  }
  isBefore(t) {
    return this.diff(t) > 0;
  }
  isAfter(t) {
    return this.diff(t) < 0;
  }
  diff(t) {
    return (t.toJSDate().getTime() - this.toJSDate().getTime()) / 864e5;
  }
  next() {
    return i.fromJSDate(new Date(this.toJSDate().getTime() + 1e3 * 60 * 60 * 24));
  }
  previous() {
    return i.fromJSDate(new Date(this.toJSDate().getTime() - 1e3 * 60 * 60 * 24));
  }
  toString() {
    return [
      this.year,
      String(this.month).padStart(2, "0"),
      String(this.date).padStart(2, "0")
    ].join("-");
  }
  static fromJSDate(t, e = !0) {
    return new i(e ? `${t.getUTCFullYear()}-${t.getUTCMonth() + 1}-${t.getUTCDate()}` : `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`);
  }
  static today(t = !0) {
    const e = new Date();
    return i.fromJSDate(e, t);
  }
}
class D {
  startDate;
  endDate;
  startWeekDayIndex;
  constructor(t, e, a = 0) {
    if (this.startDate = new i(t), this.endDate = new i(e), this.endDate.isBefore(this.startDate)) {
      const n = this.startDate;
      this.startDate = this.endDate, this.endDate = n;
    }
    this.startWeekDayIndex = a;
  }
  get length() {
    return this.startDate.diff(this.endDate) + 1;
  }
  get weekDayNames() {
    return k(this.startWeekDayIndex);
  }
  get maxWeekAxisIndex() {
    return y(this.startDate, this.endDate, this.startWeekDayIndex);
  }
  get days() {
    return [...this].map((t) => t.value);
  }
  toString(t = !0, e = " ") {
    let a = new D(this.startDate.toString(), this.endDate.toString(), this.startWeekDayIndex), n = this.maxWeekAxisIndex, r = "";
    r += a.weekDayNames.map((o) => o.slice(0, 2)).join(e) + `
`;
    for (let o of a) {
      let [h, u, l, m] = [
        o.value.date,
        o.value.dayAxisIndex,
        o.value.weekAxisIndex,
        o.value.dayNumber
      ];
      m == 1 && u > 0 && (r += Array(u).fill("  ").join(e)), r += (u == 0 ? "" : e) + `${h.date}`.padStart(2), t && (l == 0 && u == 6 && (r += ` ${d[h.month - 1]} ${h.year}`), l > 0 && u == 6 && h.date <= 7 && (r += ` ${d[h.month - 1]}`, h.month == 0 && (r += ` ${h.year}`))), r += u === 6 && l !== n ? `
` : "", h.equals(this.endDate) && u < 6 && (r += e + Array(7 - u - 1).fill("  ").join(e));
    }
    return r;
  }
  [Symbol.iterator]() {
    let t = this.startDate, e = this.endDate, a = this.startWeekDayIndex;
    return {
      curDate: t,
      curLength: 1,
      next() {
        const n = this.curDate.equals(e.next());
        let r = {
          value: new f(this.curDate, this.curLength, x(this.curDate), g(this.curDate, a), y(t, this.curDate, a)),
          done: !1
        };
        return this.curDate = this.curDate.next(), this.curLength++, { done: n, value: r };
      }
    };
  }
}
class p extends D {
  constructor(t, e, a = 0) {
    let n = `${t}-${e}-1`, r = `${t}-${e}-${new Date(Date.UTC(t, e, 0)).getUTCDate()}`;
    super(n, r, a);
  }
  toString(t = !0, e = " ") {
    let a = t ? `${d[this.startDate.month - 1]} ${this.startDate.year}` : "", n = super.toString(!1, e), r = e.length * 6 + 14, c = Math.ceil((r - a.length) / 2 + a.length);
    return (t ? a.padStart(c).padEnd(r) + `
` : "") + n;
  }
}
class w extends D {
  constructor(t, e = 0) {
    let a = `${t}-1-1`, n = `${t}-12-31`;
    super(a, n, e);
  }
}
export {
  D as Calendar,
  p as CalendarOfMonth,
  w as CalendarOfYear,
  i as PlainDate
};
