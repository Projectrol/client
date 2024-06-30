"use client";

import clsx from "clsx";
import {
  HourType,
  monthNames,
  to24WorkHourFormat,
  toHourStringFormat,
} from "@/lib/datetime";
import { Project } from "@/db/repositories/projects.repo";
import { useDroppable } from "@dnd-kit/core";
import {
  TaskInstance,
  TaskInstanceWithEntity,
} from "@/db/repositories/task-instances";
import moment from "moment";
import useCalendar from "@/hooks/use-calendar";

export default function TimetableCol({
  cellsRenderData,
  date,
  dayIndex,
  wIndex,
  weeksOfMonth,
  currentYear,
  currentMonthIndex,
  hidden = true,
  taskInstances,
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
  hidden?: boolean;
  taskInstances?: TaskInstanceWithEntity[];
}) {
  const { workHours } = useCalendar();
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
        flex: 1,
        display: hidden ? "none" : "flex",
        ...style,
      }}
      className={clsx({
        "flex-col bg-[--hover-color] pt-[10px] items-center font-semibold justify-start text-[0.725rem] border-solid border-[--border-color] transition-colors":
          true,
      })}
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
      <div id={date.dateId} className="w-full flex flex-col mt-[10px] relative">
        {workHours.length > 0 &&
          workHours.map((hour) => (
            <div
              className="w-full flex-flex-col border-solid border-[--border-color] border-b-[1px] cursor-pointer"
              key={hour + "_" + hour.type.toString()}
            >
              <div className="w-full h-[45px] flex items-center px-[20px]  hover:underline select-none">
                {hour.type === HourType.AM
                  ? toHourStringFormat(hour.value)
                  : toHourStringFormat(to24WorkHourFormat(hour))}
              </div>

              {taskInstances &&
                taskInstances.length > 0 &&
                taskInstances.find(
                  (instance) =>
                    instance.dtstart.getHours() === to24WorkHourFormat(hour)
                ) && (
                  <div className="w-full h-[80px] px-[20px] py-[15px] text-[--base] bg-[--secondary] rounded-md shadow-sm">
                    {
                      taskInstances.find(
                        (instance) =>
                          instance.dtstart.getHours() ===
                          to24WorkHourFormat(hour)
                      )!.taskEntity.title
                    }
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}

{
  /* <div>
{taskInstances &&
  taskInstances.length > 0 &&
  taskInstances.find(
    (instance) =>
      instance.dtstart.getHours() === to24WorkHourFormat(hour)
  ) && (
    <h1>
      {
        taskInstances.find(
          (instance) =>
            instance.dtstart.getHours() ===
            to24WorkHourFormat(hour)
        )!.taskEntity.title
      }
    </h1>
  )}
</div> */
}
