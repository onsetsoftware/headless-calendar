import { CalendarOfMonth } from "./src";

const calendar = new CalendarOfMonth(2022, 7, 6);

const calendarElement = document.getElementById("calendar");

document.getElementById("month").innerText =
  calendar.days[0].date.monthName + " " + calendar.days[0].date.year;
document.getElementById("pre").innerText = calendar.toString();

if (calendar.days[0].dayAxisIndex > 0) {
  const spacing = document.createElement("div");
  spacing.setAttribute("class", "col-span-" + calendar.days[0].dayAxisIndex);
  calendarElement.appendChild(spacing);
}

calendar.days.forEach((day) => {
  const d = document.createElement("div");
  d.innerText = String(day.weekAxisIndex);
  calendarElement?.appendChild(d);
});
