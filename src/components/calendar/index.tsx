"use client";

import { Project } from "@/db/repositories/projects.repo";
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
import { db } from "@/db";
import { useRouter } from "next/navigation";
import TimetableCol from "./timetable-col";

export default function Calendar({
  weeksOfMonth,
  weekOfMonth,
  currentMonthIndex,
  currentYear,
  cellsRenderData,
  style,
  mode = "timetable",
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
    const oldStartDate = moment(project.startDate);
    const oldTargetDate = moment(project.targetDate);
    const diff = oldTargetDate.diff(oldStartDate, "days");
    const newStartDate = new Date(
      2024,
      parseInt(startMonthIndex),
      parseInt(startDate)
    );

    const newTargetDate = new Date(
      moment(newStartDate).add(diff, "days").toString()
    );

    const respone = await db.projects.updateProjectDate(
      project.id,
      newStartDate,
      newTargetDate
    );

    if (respone) {
      router.refresh();
    }
  };

  const handleUpdateTargetDate = async (dateId: string, project: Project) => {
    const targetDate = dateId.split("_")[0];
    const targetMonthIndex = dateId.split("_")[1];
    const oldStartDate = moment(project.startDate);
    const oldTargetDate = moment(project.targetDate);
    const diff = oldTargetDate.diff(oldStartDate, "days");
    const newTargetDate = new Date(
      2024,
      parseInt(targetMonthIndex),
      parseInt(targetDate)
    );

    const newStartDate = new Date(
      moment(newTargetDate).subtract(diff, "days").toString()
    );

    const respone = await db.projects.updateProjectDate(
      project.id,
      newStartDate,
      newTargetDate
    );

    if (respone) {
      router.refresh();
    }
  };

  return (
    <div
      id="calendar"
      className="w-full h-full flex flex-col justify-start rounded-md 
      shadow-md overflow-hidden relative"
      style={style}
    >
      <div className="w-full flex flex-wrap bg-[--secondary]">
        {Array(7)
          .fill("")
          .map((_, dayIndex) => (
            <div
              style={{
                width: "calc(100% / 7)",
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
          {mode === "timetable" &&
            weekOfMonth.length > 0 &&
            weekOfMonth.map((date, dIndex) => (
              <TimetableCol
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
      </DndContext>
    </div>
  );
}
