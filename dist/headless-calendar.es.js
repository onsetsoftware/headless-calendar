class x {
  constructor(t, e, a, s, r) {
    this.date = t, this.dayNumber = e, this.dayOfTheWeek = a, this.dayAxisIndex = s, this.weekAxisIndex = r;
  }
  isFirstDayOfWeekAndMonth() {
    const t = this.date.toJSDate().getUTCDate();
    return this.dayAxisIndex == 0 && t >= 1 && t <= 7;
  }
}
function S(n) {
  return n.toJSDate().getUTCDay();
}
function g(n, t) {
  const e = n.toJSDate().getUTCDay();
  return (t <= e ? 0 : 7) + e - t;
}
function y(n, t, e) {
  return Math.ceil((g(n, e) + (n.diff(t) + 1)) / 7) - 1;
}
const f = [
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
function $(n, t) {
  return t = t % n.length, n.slice(t, n.length).concat(n.slice(0, t));
}
function k(n) {
  return $(f, n);
}
class i {
  year;
  month;
  date;
  constructor(t = i.today().toString()) {
    const [e, a, s] = t.split("-").map((r) => Number(r));
    this.year = e, this.month = a, this.date = s;
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
  diff(t) {
    return Math.abs(t.toJSDate().getTime() - this.toJSDate().getTime()) / 864e5;
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
    this.startDate = new i(t), this.endDate = new i(e), this.startWeekDayIndex = a;
  }
  get length() {
    return this.startDate.diff(this.endDate);
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
    let a = new D(this.startDate.toString(), this.endDate.toString(), this.startWeekDayIndex), s = this.maxWeekAxisIndex, r = "";
    r += a.weekDayNames.map((o) => o.slice(0, 2)).join(e) + `
`;
    for (let o of a) {
      let [h, u, l, m] = [
        o.value.date,
        o.value.dayAxisIndex,
        o.value.weekAxisIndex,
        o.value.dayNumber
      ];
      m == 1 && u > 0 && (r += Array(u).fill("  ").join(e)), r += (u == 0 ? "" : e) + `${h.date}`.padStart(2), t && (l == 0 && u == 6 && (r += ` ${d[h.month - 1]} ${h.year}`), l > 0 && u == 6 && h.date <= 7 && (r += ` ${d[h.month - 1]}`, h.month == 0 && (r += ` ${h.year}`))), r += u === 6 && l !== s ? `
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
        const s = this.curDate.equals(e.next());
        let r = {
          value: new x(this.curDate, this.curLength, S(this.curDate), g(this.curDate, a), y(t, this.curDate, a)),
          done: !1
        };
        return this.curDate = this.curDate.next(), this.curLength++, { done: s, value: r };
      }
    };
  }
}
class p extends D {
  constructor(t, e, a = 0) {
    let s = `${t}-${e}-1`, r = `${t}-${e}-${new Date(Date.UTC(t, e, 0)).getUTCDate()}`;
    super(s, r, a);
  }
  toString(t = !0, e = " ") {
    let a = t ? `${d[this.startDate.month - 1]} ${this.startDate.year}` : "", s = super.toString(!1, e), r = e.length * 6 + 14, c = Math.ceil((r - a.length) / 2 + a.length);
    return (t ? a.padStart(c).padEnd(r) + `
` : "") + s;
  }
}
class w extends D {
  constructor(t, e = 0) {
    let a = `${t}-1-1`, s = `${t}-12-31`;
    super(a, s, e);
  }
}
export {
  D as Calendar,
  p as CalendarOfMonth,
  w as CalendarOfYear,
  i as PlainDate
};
