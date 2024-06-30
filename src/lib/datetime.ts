const getTotalDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getTotalDaysInYear = (year: number): number => {
  const totalMonths = 12;
  const totalDays = Array(totalMonths)
    .fill("")
    .reduce((currTotal, _, i) => currTotal + getTotalDaysInMonth(i, year), 0);
  return totalDays;
};

const monthNames = [
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
  "December",
];

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const fulldayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getFirstMondayOfJanDate = (year: number) => {
  let date = 0;
  for (let i = 1; i < 32; i++) {
    const dayIndex = new Date(year, 0, i).getDay();
    if (dayNames[dayIndex] === "MON") {
      date = i;
      break;
    }
  }
  return date;
};

const getWeeksOfMonthsInYear = (
  year: number
): Array<{
  monthIndex: number;
  weeks: { date: number; monthIndex: number; dateId: string }[][];
}> => {
  const weeksOfMonths: Array<{
    monthIndex: number;
    weeks: { date: number; monthIndex: number; dateId: string }[][];
  }> = [];

  let weeks: { date: number; monthIndex: number; dateId: string }[][] = [];
  let week: { date: number; monthIndex: number; dateId: string }[] = [];

  const firstDayOfYear = getFirstDayOfYear(year);

  let lastMondayLastYearDate = 0;

  if (firstDayOfYear !== 1) {
    for (let i = 31; i > 0; i--) {
      const day = new Date(year - 1, 11, i).getDay();
      if (dayNames[day] === "MON") {
        lastMondayLastYearDate = i;
        break;
      }
    }
    for (let i = lastMondayLastYearDate; i < 32; i++) {
      week.push({ date: i, monthIndex: 11, dateId: `${i}-11_${year}` });
    }
  }
  let currentCountDateOfAWeek = 1;
  if (lastMondayLastYearDate === 0) {
    currentCountDateOfAWeek = getFirstMondayOfJanDate(year);
  }

  for (let i = 0; i < 12; i++) {
    const totalDaysInMonth = getTotalDaysInMonth(i, year);

    for (let z = currentCountDateOfAWeek; z < totalDaysInMonth + 1; z++) {
      if (week.length < 7) {
        week.push({ date: z, monthIndex: i, dateId: `${z}_${i}_${year}` });
      }

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (i === 11) {
      const currentWeek = weeks[weeks.length - 1];
      if (currentWeek[currentWeek.length - 1].date < 31) {
        weeks.push(week);
        week = [];
      }
    }

    weeksOfMonths.push({ monthIndex: i, weeks });
    weeks = [];
  }
  return weeksOfMonths;
};

const getFirstDayOfYear = (year: number) => {
  return new Date(year, 0, 1).getDay();
};

export enum HourType {
  AM = "AM",
  PM = "PM",
}

export type WorkHour = {
  value: number;
  type: HourType;
};

const to24WorkHourFormat = (workHour: WorkHour) => {
  if (workHour.type === HourType.AM) {
    return workHour.value;
  }
  return workHour.value + 12;
};

const to12WorkHourFormat = (workHour: WorkHour) => {
  if (workHour.type === HourType.AM) {
    return workHour.value;
  }
  return workHour.value - 12;
};

const toHourStringFormat = (hour: number) => {
  const hourValue = Math.floor(hour);
  let minutesValueStr = "";
  const minutesValue = (hour - hourValue) * 100;
  if (minutesValue < 10) {
    minutesValueStr = `0${minutesValue}`;
  } else {
    minutesValueStr = minutesValue.toString();
  }
  return `${hourValue}:${minutesValueStr}`;
};

const getDayWorkHoursList = (data: {
  workFromHour: WorkHour;
  workToHour: WorkHour;
}): WorkHour[] => {
  const { workFromHour, workToHour } = data;
  const workFromHour24format = to24WorkHourFormat(workFromHour);
  const workToHour24format = to24WorkHourFormat(workToHour);
  return Array(workToHour24format - workFromHour24format + 1)
    .fill("")
    .map((_, i) => {
      const hour24HFormat = i + workFromHour24format;
      const type = hour24HFormat > 12 ? HourType.PM : HourType.AM;
      return {
        type,
        value: to12WorkHourFormat({ value: hour24HFormat, type }),
      };
    });
};

function getDateOfNthDay(
  year: number,
  month: number,
  dayOfWeekIndex: number,
  n: number
) {
  // Ensure n is within bounds (1 to 5)
  if (n < 1 || n > 5) {
    throw new Error("Invalid value of n. It should be between 1 and 5.");
  }

  // Calculate the first day of the month
  const firstDay = new Date(year, month - 1, 1);

  // Calculate the day of the week of the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();

  // Calculate the difference between the target day of the week and the first day of the month
  let offset = dayOfWeekIndex - firstDayOfWeek;
  if (offset < 0) {
    offset += 7; // Ensure offset is positive
  }
  const nthDay = 1 + (n - 1) * 7 + offset;
  return new Date(year, month - 1, nthDay);
}

export {
  getTotalDaysInMonth,
  getTotalDaysInYear,
  monthNames,
  dayNames,
  getFirstMondayOfJanDate,
  getWeeksOfMonthsInYear,
  getDayWorkHoursList,
  to12WorkHourFormat,
  to24WorkHourFormat,
  toHourStringFormat,
  getDateOfNthDay,
  fulldayNames,
};
