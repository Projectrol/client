"use client";

import Calendar from "@/components/calendar";
import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import { StatusColors } from "@/configs/status-colors";
import { Project } from "@/db/repositories/projects.repo";
import useCalendar from "@/lib/calendar/use-calendar";
import { getTotalDaysInMonth, monthNames } from "@/lib/datetime";
import useProjects from "@/services/rquery/hooks/useProjects";
import moment from "moment";
import { useEffect, useState } from "react";

export default function CalendarPage() {
  const {
    weeksOfMonth,
    weekOfMonth,
    setWeekNo,
    weekNo,
    currentMonthIndex,
    setCurrentMonthIndex,
    jumpToTargetDate,
    jumpToSpecificWeekOfMonthIndex,
    currMonthWeeksCount,
    year: currentYear,
    setYear: setCurrentYear,
  } = useCalendar();

  const [cellsRenderData, setCellsRenderData] = useState<
    {
      project: Project;
      data: {
        dateId: string;
        data: React.ReactNode;
      }[];
    }[]
  >([]);

  const { projects, isLoadingProjects } = useProjects();

  useEffect(() => {
    const date = new Date();
    jumpToTargetDate(date.getDate(), date.getMonth(), date.getFullYear());
  }, []);

  useEffect(() => {
    const cellsRenderData: {
      project: Project;
      data: {
        dateId: string;
        data: React.ReactNode;
      }[];
    }[] = [];
  }, []);

  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-start overflow-y-auto gap-[10px] pb-[50px]">
      <MainBodyHeader title="Calendar" />
      {/* <div className="w-[95%] h-[50px] py-[10px] flex gap-[10px]">
        <button
          onClick={() => {
            if (currentMonthIndex > 0) {
              setCurrentMonthIndex(currentMonthIndex - 1);
            } else {
              setCurrentYear(currentYear - 1);
              setCurrentMonthIndex(11);
            }
          }}
        >
          Prev
        </button>
        <div className="w-[200px] flex justify-center select-none">
          {monthNames[currentMonthIndex]} {currentYear}{" "}
        </div>
        <button
          onClick={() => {
            if (currentMonthIndex < 11) {
              setCurrentMonthIndex(currentMonthIndex + 1);
            } else {
              setCurrentYear(currentYear + 1);
              setCurrentMonthIndex(0);
            }
          }}
        >
          Next
        </button>
      </div> */}
      <div className="w-[95%] h-[50px] py-[10px] flex gap-[10px]">
        <button
          onClick={() => {
            if (weekNo > 0) {
              setWeekNo(weekNo - 1);
            } else {
              if (currentMonthIndex === 0 && weekNo === 0) {
                jumpToSpecificWeekOfMonthIndex(11, currentYear - 1, -1);
              } else {
                jumpToSpecificWeekOfMonthIndex(
                  currentMonthIndex - 1,
                  currentYear,
                  -1
                );
              }
            }
          }}
        >
          Prev
        </button>
        <div className="w-[200px] flex justify-center select-none">
          {monthNames[currentMonthIndex]} {currentYear}{" "}
        </div>
        <button
          onClick={() => {
            if (weekNo < currMonthWeeksCount - 1) {
              setWeekNo(weekNo + 1);
            } else {
              if (currentMonthIndex === 11) {
                jumpToSpecificWeekOfMonthIndex(0, currentYear + 1, 0);
              } else {
                setCurrentMonthIndex(currentMonthIndex + 1);
                setWeekNo(0);
              }
            }
          }}
        >
          Next (current: {weekNo}, {currMonthWeeksCount - 1})
        </button>
      </div>
      <Calendar
        style={{ width: "96%" }}
        weekOfMonth={weekOfMonth}
        weeksOfMonth={weeksOfMonth}
        currentYear={currentYear}
        currentMonthIndex={currentMonthIndex}
      />
    </div>
  );
}
