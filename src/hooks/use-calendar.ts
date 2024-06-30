import { useEffect, useState } from "react";
import {
  HourType,
  WorkHour,
  getDayWorkHoursList,
  getWeeksOfMonthsInYear,
} from "../lib/datetime";

export default function useCalendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [currMonthWeeksCount, setCurrMonthWeeksCount] = useState(0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [weekNo, setWeekNo] = useState(0);
  const [weeksOfMonth, setWeeksOFMonth] = useState<
    {
      date: number;
      monthIndex: number;
      dateId: string;
    }[][]
  >([[]]);
  const [weekOfMonth, setWeekOfMonth] = useState<
    {
      date: number;
      monthIndex: number;
      dateId: string;
    }[]
  >([]);
  const [workHours, setWorkHours] = useState<WorkHour[]>([]);

  useEffect(() => {
    const workHours = getDayWorkHoursList({
      workFromHour: { type: HourType.AM, value: 8 },
      workToHour: { type: HourType.PM, value: 5 },
    });
    setWorkHours(workHours);
  }, []);

  useEffect(() => {
    const weeksOfMonth = getWeeksOfMonthsInYear(year).find(
      (i) => i.monthIndex === currentMonthIndex
    )!.weeks;
    setWeeksOFMonth(weeksOfMonth);
    setCurrMonthWeeksCount(weeksOfMonth.length);
  }, [currentMonthIndex, year]);

  const jumpToTargetDate = (
    date: number,
    monthIndex: number,
    targetYear: number
  ) => {
    let targetMonthIndex = -1;
    const dateId = `${date}_${monthIndex}_${targetYear}`;
    getWeeksOfMonthsInYear(targetYear).forEach((weeksOfMonth) => {
      weeksOfMonth.weeks.forEach((week) => {
        const index = week.findIndex((date) => date.dateId === dateId);
        if (index !== -1) {
          targetMonthIndex = weeksOfMonth.monthIndex;
        }
      });
    });
    const weeksOfMonth = getWeeksOfMonthsInYear(year).find(
      (i) => i.monthIndex === targetMonthIndex
    )!.weeks;
    setWeeksOFMonth(weeksOfMonth);

    weeksOfMonth.forEach((w, wIndex) => {
      w.forEach((date) => {
        if (date.dateId === dateId) {
          setWeekOfMonth(w);
          setWeekNo(wIndex);
        }
      });
    });

    setYear(targetYear);
    setCurrentMonthIndex(targetMonthIndex);
  };

  const jumpToSpecificWeekOfMonthIndex = (
    monthIndex: number,
    _year: number,
    weekNo: number
  ) => {
    const weeksOfMonth = getWeeksOfMonthsInYear(_year).find(
      (i) => i.monthIndex === monthIndex
    )!.weeks;
    setYear(_year);
    setWeeksOFMonth(weeksOfMonth);
    setCurrMonthWeeksCount(weeksOfMonth.length);
    if (weekNo !== -1) {
      setWeekNo(weekNo);
    } else {
      setWeekNo(weeksOfMonth.length - 1);
    }
    setCurrentMonthIndex(monthIndex);
  };

  useEffect(() => {
    const weekOfMonth = getWeeksOfMonthsInYear(year).find(
      (i) => i.monthIndex === currentMonthIndex
    )!.weeks[weekNo];
    setWeekOfMonth(weekOfMonth);
  }, [weekNo, currentMonthIndex, year]);

  return {
    weekNo,
    setWeekNo,
    workHours,
    weekOfMonth,
    currMonthWeeksCount,
    weeksOfMonth,
    jumpToTargetDate,
    setCurrentMonthIndex,
    year,
    setYear,
    jumpToSpecificWeekOfMonthIndex,
    currentMonthIndex,
  };
}
