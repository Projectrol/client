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

export {
  getTotalDaysInMonth,
  getTotalDaysInYear,
  monthNames,
  dayNames,
  getFirstMondayOfJanDate,
  getWeeksOfMonthsInYear,
};
