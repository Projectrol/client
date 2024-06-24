"use client";

import { Project } from "@/db/repositories/projects.repo";
import { monthNames } from "@/lib/timeline/datetime";
import useTimeline, { TimelineUnit } from "@/lib/timeline/use-timeline";
import { useEffect, useRef, useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { TimelineEvent } from "./timeline-event";
import moment from "moment";
import { db } from "@/db";

export default function Timeline({ projects }: { projects: Project[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  const [draggingOnDate, setDraggingOnDate] = useState<{
    eventIndex: number;
    start: Date;
    target: Date;
  } | null>(null);
  const [groupItemsIds, setGroupItemsIds] = useState<string[]>([]);
  const { groups, setGroupingMode, groupingMode } = useTimeline({
    initGroupingMode: { mode: "months in year", year: 2024 },
  });
  const calendarDivRef = useRef<HTMLDivElement>(null);
  const [projectsPos, setProjectsPos] = useState<
    {
      project: Project;
      start: number;
      end: number;
    }[]
  >([]);

  useEffect(() => {
    if (
      calendarDivRef &&
      calendarDivRef.current &&
      groups.length > 0 &&
      projects.length > 0
    ) {
      const projectsPos: any[] = [];
      projects
        .toSorted(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        .forEach((project) => {
          const startDate = new Date(project.startDate);
          const endDate = new Date(project.targetDate);
          const start_month = startDate.getMonth() + 1;
          const start_day = startDate.getDate();
          const start_id = start_day + "_" + start_month;
          const end_month = endDate.getMonth() + 1;
          const end_day = endDate.getDate();
          const end_id = end_day + "_" + end_month;
          const startEle = document.getElementById(start_id);
          const endEle = document.getElementById(end_id);

          if (startEle && endEle) {
            projectsPos.push({
              project,
              start: startEle.offsetLeft,
              end: endEle.offsetLeft,
            });
          }
        });
      setProjectsPos(projectsPos);
    }
  }, [groups, projects]);

  useEffect(() => {
    if (groups.length > 0) {
      const groupItemsIds: string[] = [];
      groups.forEach((group) => {
        group.items.forEach((item) => {
          const id = item.value + "_" + group.value;
          groupItemsIds.push(id);
        });
      });
      setGroupItemsIds(groupItemsIds);
    }
  }, [groups]);

  useEffect(() => {
    if (projectsPos.length > 0 && calendarDivRef.current) {
      calendarDivRef.current.scrollTo({
        left: projectsPos[0].start / 2,
        behavior: "smooth",
      });
    }
  }, [projectsPos]);

  const getStartTargetDateByPos = (x: number, eventIndex: number) => {
    let startEleIndex = "";
    let startDate: Date | null = null;
    let targetDate: Date | null = null;
    for (let i = 0; i < groupItemsIds.length; i++) {
      const ele = document.getElementById(groupItemsIds[i]);
      if (ele) {
        if (Math.abs(x - ele.offsetLeft) <= 5) {
          startEleIndex = groupItemsIds[i];
          break;
        }
      }
    }

    if (startEleIndex !== "") {
      const project = projectsPos[eventIndex].project;
      const oldStartDate = moment(project.startDate);
      const oldTargetDate = moment(project.targetDate);
      const diff = oldTargetDate.diff(oldStartDate, "days");
      startDate = new Date();
      startDate.setDate(parseInt(startEleIndex.split("_")[0]));
      startDate.setMonth(parseInt(startEleIndex.split("_")[1]) - 1);
      targetDate = new Date(moment(startDate).add(diff, "days").toString());
    }
    return {
      startDate,
      targetDate,
    };
  };

  const handleDropEventTimeline = async (newX: number, index: number) => {
    setDraggingOnDate(null);
    const { startDate, targetDate } = getStartTargetDateByPos(newX, index);
    if (startDate && targetDate) {
      const project = projectsPos[index].project;
      const respone = await db.projects.updateProjectDate(
        project.id,
        startDate,
        targetDate
      );
      if (respone) {
        const startDate = new Date(respone.startDate);
        const endDate = new Date(respone.targetDate);
        const start_month = startDate.getMonth() + 1;
        const start_day = startDate.getDate();
        const start_id = start_day + "_" + start_month;
        const end_month = endDate.getMonth() + 1;
        const end_day = endDate.getDate();
        const end_id = end_day + "_" + end_month;
        const startEle = document.getElementById(start_id);
        const endEle = document.getElementById(end_id);

        if (startEle && endEle) {
          const newProjectsPos = [...projectsPos];
          newProjectsPos[index].start = startEle.offsetLeft;
          newProjectsPos[index].end = endEle.offsetLeft;
          setProjectsPos(newProjectsPos);
        }
      }
    }
  };

  const handleOnDragging = (currentX: number | null, index: number) => {
    if (!currentX) return;

    const { startDate, targetDate } = getStartTargetDateByPos(currentX, index);
    if (startDate && targetDate) {
      setDraggingOnDate({
        eventIndex: index,
        start: startDate,
        target: targetDate,
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1 bg-[red] relative">
        <div
          ref={calendarDivRef}
          className="w-full h-full flex flex-row bg-[--primary] overflow-x-auto relative"
        >
          <DndContext>
            <div
              ref={setNodeRef}
              style={{
                width: calendarDivRef.current
                  ? calendarDivRef.current.scrollWidth + "px"
                  : 0,
                ...style,
              }}
              className="left-0 top-[100px] z-[500] flex flex-col gap-[50px] overflow-x-auto absolute pt-[40px]"
            >
              {projectsPos?.length > 0 &&
                projectsPos.map((pos, i) => (
                  <TimelineEvent
                    onDragging={(currentX) => handleOnDragging(currentX, i)}
                    onDrop={(newX) => handleDropEventTimeline(newX, i)}
                    key={pos.project.id}
                    pos={pos}
                    draggingOnDate={draggingOnDate}
                  />
                ))}
            </div>
          </DndContext>
          {groups.map((group) => (
            <div
              className="flex flex-col items-start border-r-solid border-r-[1px] 
                        border-r-[--border-color] px-[10px] select-none"
              key={group.value}
            >
              <div className="text-[0.65rem] font-semibold text-[--base] py-[5px] pl-[6px]">
                {group.unit === TimelineUnit.MONTH
                  ? monthNames[group.value - 1].substring(0, 3).toUpperCase()
                  : group.value}
              </div>
              <div className="flex flex-row">
                {group.items.map((item) => (
                  <div
                    style={{
                      opacity: item.value % 5 === 0 || item.value === 1 ? 1 : 0,
                    }}
                    id={item.value + "_" + group.value}
                    className="text-[0.7rem] text-[--text-header-color] w-[5px] flex flex-col items-center gap-[2px]"
                    key={item.value + "_" + group.value}
                  >
                    <div className="w-[1px] h-[5px] bg-[--text-header-color]" />
                    {item.unit === TimelineUnit.MONTH
                      ? monthNames[item.value - 1].substring(0, 3).toUpperCase()
                      : item.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
