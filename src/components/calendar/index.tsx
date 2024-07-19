"use client";

import { dayNames } from "@/lib/datetime";
import clsx from "clsx";
import React from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import CalendarCell from "./calendar-cell";
import moment from "moment";
import { useRouter } from "next/navigation";
import TimetableCol from "./timetable-col";
import { Project } from "@/services/api/projects-service";
export default function Calendar({
  weeksOfMonth,
  weekOfMonth,
  currentMonthIndex,
  currentYear,
  cellsRenderData,
  style,
  mode = "timetable",
  hideWeekend = false,
  taskInstances,
}: {
  weeksOfMonth: {
    date: number;
    monthIndex: number;
    dateId: string;
  }[][];
  weekOfMonth: {
    date: number;
    monthIndex: number;
    dateId: string;
  }[];
  currentMonthIndex: number;
  currentYear: number;
  style?: React.CSSProperties;
  cellsRenderData?: {
    project: Project;
    data: {
      dateId: string;
      data: React.ReactNode;
    }[];
  }[];
  mode?: "calendar" | "timetable";
  hideWeekend?: boolean;
  taskInstances?: any[];
}) {
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const { isOver, setNodeRef } = useDroppable({
    id: "calandar",
  });

  const handleOnDragEnd = async (e: DragEndEvent) => {
    if (!e.over || !e.active) return;
    const dateId = e.over.id as string;
    const project = e.active.data.current!["project"] as Project;
    const type = e.active.data.current!["type"] as "start" | "target";
    if (type === "start") {
      handleUpdateStartDate(dateId, project);
    } else if (type === "target") {
      handleUpdateTargetDate(dateId, project);
    }
  };

  const handleUpdateStartDate = async (dateId: string, project: Project) => {
    const startDate = dateId.split("_")[0];

    const startMonthIndex = dateId.split("_")[1];
    const oldStartDate = moment(project.dtstart);
    const oldTargetDate = moment(project.dtend);
    const diff = oldTargetDate.diff(oldStartDate, "days");
    const newStartDate = new Date(
      2024,
      parseInt(startMonthIndex),
      parseInt(startDate)
    );

    const newTargetDate = new Date(
      moment(newStartDate).add(diff, "days").toString()
    );

    // const respone = await db.projects.updateProjectDate(
    //   project.id,
    //   newStartDate,
    //   newTargetDate
    // );

    // if (respone) {
    //   router.refresh();
    // }
  };

  const handleUpdateTargetDate = async (dateId: string, project: Project) => {
    const targetDate = dateId.split("_")[0];
    const targetMonthIndex = dateId.split("_")[1];
    const oldStartDate = moment(project.dtstart);
    const oldTargetDate = moment(project.dtend);
    const diff = oldTargetDate.diff(oldStartDate, "days");
    const newTargetDate = new Date(
      2024,
      parseInt(targetMonthIndex),
      parseInt(targetDate)
    );

    const newStartDate = new Date(
      moment(newTargetDate).subtract(diff, "days").toString()
    );

    // const respone = await db.projects.updateProjectDate(
    //   project.id,
    //   newStartDate,
    //   newTargetDate
    // );

    // if (respone) {
    //   router.refresh();
    // }
  };

  return (
    <div
      id="calendar"
      className="w-full flex flex-col justify-start rounded-md relative"
      style={style}
    >
      <div className="w-full flex flex-wrap bg-[--secondary]">
        {Array(7)
          .fill("")
          .map((_, dayIndex) => (
            <div
              style={{
                flex: 1,
                display: hideWeekend
                  ? dayIndex === 5 || dayIndex === 6
                    ? "none"
                    : "flex"
                  : "flex",
              }}
              key={dayIndex + 1}
              className={clsx(
                {
                  "flex justify-center py-[8px] text-[0.8rem] font-semibold border-solid border-[--border-color]":
                    true,
                },
                {
                  "text-[--base]": dayIndex < 5,
                },
                {
                  "text-[#F50057]": dayIndex >= 5,
                }
              )}
            >
              {dayNames[dayIndex + 1]}
            </div>
          ))}
      </div>

      <DndContext onDragEnd={handleOnDragEnd} sensors={sensors}>
        <div ref={setNodeRef} className="w-full h-full flex flex-wrap">
          {mode === "calendar" &&
            weeksOfMonth.length > 0 &&
            weeksOfMonth.map((week, wIndex) =>
              week.map((date, dayIndex) => (
                <CalendarCell
                  key={date.dateId}
                  cellsRenderData={cellsRenderData}
                  currentMonthIndex={currentMonthIndex}
                  currentYear={currentYear}
                  date={date}
                  dayIndex={dayIndex}
                  wIndex={wIndex}
                  weeksOfMonth={weeksOfMonth}
                />
              ))
            )}
          <div className="w-full overflow-y-auto">
            {mode === "timetable" &&
              weekOfMonth.length > 0 &&
              weekOfMonth.map((date, dIndex) => (
                <TimetableCol
                  hidden={
                    hideWeekend
                      ? dIndex === 5 || dIndex === 6
                        ? true
                        : false
                      : false
                  }
                  taskInstances={
                    taskInstances
                      ? taskInstances.filter((instance) => {
                          const instanceStartDate = instance.dtstart.getDate();
                          const instanceStartMonthIndex =
                            instance.dtstart.getMonth();
                          const instanceStartYear =
                            instance.dtstart.getFullYear();
                          const instanceDateId = `${instanceStartDate}_${instanceStartMonthIndex}_${instanceStartYear}`;
                          if (date.dateId === instanceDateId) {
                            return instance;
                          }
                        })
                      : []
                  }
                  key={date.dateId}
                  cellsRenderData={cellsRenderData}
                  currentMonthIndex={currentMonthIndex}
                  currentYear={currentYear}
                  date={date}
                  dayIndex={dIndex}
                  wIndex={dIndex}
                  weeksOfMonth={weeksOfMonth}
                />
              ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
