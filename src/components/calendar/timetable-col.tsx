"use client";

import clsx from "clsx";
import { monthNames } from "@/lib/datetime";
import { Project } from "@/db/repositories/projects.repo";
import { useDroppable } from "@dnd-kit/core";

export default function TimetableCol({
  cellsRenderData,
  date,
  dayIndex,
  wIndex,
  weeksOfMonth,
  currentYear,
  currentMonthIndex,
}: {
  cellsRenderData?: {
    project: Project;
    data: {
      dateId: string;
      data: React.ReactNode;
    }[];
  }[];
  date: {
    date: number;
    monthIndex: number;
    dateId: string;
  };
  dayIndex: number;
  wIndex: number;
  weeksOfMonth: {
    date: number;
    monthIndex: number;
    dateId: string;
  }[][];
  currentYear: number;
  currentMonthIndex: number;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: date.dateId,
    data: {
      accepts: ["start", "target"],
    },
  });

  const style = {
    bacground: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "calc(100% / 7)",
        height: "100%",
        ...style,
      }}
      className={clsx(
        {
          "flex flex-col items-start font-semibold justify-start py-[5px] text-[0.725rem] border-solid border-[--border-color] transition-colors":
            true,
        },
        {
          "border-r-[1px]": dayIndex % 6 !== 0 || dayIndex === 0,
        },
        {
          "border-b-[1px]": wIndex < weeksOfMonth.length - 1,
        }
      )}
      key={`${date.date}_${date.monthIndex}`}
    >
      <span
        className={clsx(
          {
            "w-[44px] aspect-square rounded-full flex items-center justify-center ml-[5px]":
              true,
          },
          {
            "bg-[#E1BEE7]":
              `${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}` ===
                date.dateId && new Date().getFullYear() === currentYear,
          },
          {
            "text-[#F50057]": dayIndex >= 5,
          },
          {
            "text-[--base]":
              dayIndex < 5 && date.monthIndex === currentMonthIndex,
          },
          {
            "opacity-50": date.monthIndex !== currentMonthIndex && dayIndex < 5,
          }
        )}
      >
        {date.date === 1 &&
          monthNames[date.monthIndex].substring(0, 3).toUpperCase()}{" "}
        {date.date}
      </span>
      <div
        id={date.dateId}
        className="w-full flex-1 flex flex-col gap-[8px] mt-[10px] relative"
      ></div>
    </div>
  );
}
