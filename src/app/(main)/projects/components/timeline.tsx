"use client";

import { Project } from "@/db/repositories/projects.repo";
import { monthNames } from "@/lib/timeline/datetime";
import useTimeline, { TimelineUnit } from "@/lib/timeline/use-timeline";
import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TimelineEvent } from "./timeline-event";
import moment from "moment";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { db } from "@/db";
import ProjectDetailsDrawer from "./project-details-drawer";

export default function Timeline({ projects }: { projects: Project[] }) {
  const gridSize = 5; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isOver, setNodeRef } = useDroppable({
    id: "timeline-calandar",
  });
  const [draggingOnDate, setDraggingOnDate] = useState<{
    eventIndex: number;
    start: Date;
    target: Date;
  } | null>(null);
  const [groupItemsIds, setGroupItemsIds] = useState<string[]>([]);
  const [currentEleLeft, setCurrentEleLeft] = useState(0);
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
      projects.forEach((project) => {
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
            start: startEle.offsetLeft + 2.5,
            end: endEle.offsetLeft + 2.5,
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
    if (groupItemsIds.length > 0) {
      const currentDate = new Date();
      const currentEleId =
        currentDate.getDate() + "_" + (currentDate.getMonth() + 1);
      const currentEle = document.getElementById(currentEleId);
      if (!currentEle) return;
      setCurrentEleLeft(currentEle.offsetLeft);
      if (calendarDivRef.current) {
        calendarDivRef.current.scrollTo({
          left: currentEle.offsetLeft / 2,
          behavior: "smooth",
        });
      }
    }
  }, [groupItemsIds]);

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
      const monthIndex = parseInt(startEleIndex.split("_")[1]) - 1;
      const day = parseInt(startEleIndex.split("_")[0]);
      const year = new Date().getFullYear();
      startDate = new Date(year, monthIndex, day);
      targetDate = new Date(moment(startDate).add(diff, "days").toString());
    }

    return {
      startDate,
      targetDate,
    };
  };

  const handleDropEventTimeline = async (newX: number, index: number) => {
    setDraggingOnDate(null);
    const oldPos = Object.assign({}, projectsPos[index]);
    const { startDate, targetDate } = getStartTargetDateByPos(newX, index);
    if (startDate && targetDate) {
      const start_month = startDate.getMonth() + 1;
      const start_day = startDate.getDate();
      const start_id = start_day + "_" + start_month;
      const end_month = targetDate.getMonth() + 1;
      const end_day = targetDate.getDate();
      const end_id = end_day + "_" + end_month;
      const startEle = document.getElementById(start_id);
      const endEle = document.getElementById(end_id);

      if (startEle && endEle) {
        const newProjectsPos = [...projectsPos];
        newProjectsPos[index].start = startEle.offsetLeft + 2.5;
        newProjectsPos[index].end = endEle.offsetLeft + 2.5;
        setProjectsPos(newProjectsPos);
      }

      const project = projectsPos[index].project;
      const respone = await db.projects.updateProjectDate(
        project.id,
        startDate,
        targetDate
      );

      if (!respone) {
        const newProjectsPos = [...projectsPos];
        newProjectsPos[index].start = oldPos.start;
        newProjectsPos[index].end = oldPos.end;
        setProjectsPos(newProjectsPos);
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
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <div
        className="w-full h-[40px] bg-[--primary] flex items-center 
                  border-solid border-b-[1px] border-b-[--border-color]"
      ></div>
      <div className="w-full flex-1 relative px-[10px]">
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
          ref={calendarDivRef}
          className="w-full h-full flex flex-row bg-[--primary] overflow-x-auto relative"
        >
          <DndContext modifiers={[snapToGridModifier]} sensors={sensors}>
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
              ref={setNodeRef}
              style={{
                width: calendarDivRef.current
                  ? calendarDivRef.current.scrollWidth + "px"
                  : 0,
              }}
              className="left-0 top-[100px] z-[500] flex flex-col gap-[60px] overflow-x-auto absolute pt-[50px]"
            >
              {projectsPos?.length > 0 &&
                projectsPos.map((pos, i) => (
                  <TimelineEvent
                    onClick={() => setSelectedProject(pos.project)}
                    selectedProject={selectedProject}
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
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
              className="flex flex-col items-start border-dashed border-r-[1px] 
                        border-r-[--border-color] select-none"
              key={group.value}
            >
              <div className="text-[0.65rem] font-semibold text-[--base] py-[5px] pl-[6px]">
                {group.unit === TimelineUnit.MONTH
                  ? monthNames[group.value - 1].substring(0, 3).toUpperCase()
                  : group.value}
              </div>
              <div className="flex flex-row">
                {group.items.map((item, itemIndex) => (
                  <div
                    style={{
                      opacity: item.value % 5 === 0 || item.value === 1 ? 1 : 0,
                      marginRight:
                        itemIndex === group.items.length - 1 ? "10px" : 0,
                      width: itemIndex === 0 ? "10px" : "5px",
                      alignItems: itemIndex === 0 ? "flex-end" : "center",
                    }}
                    id={item.value + "_" + group.value}
                    className="text-[0.7rem] text-[--text-header-color] flex flex-col"
                    key={item.value + "_" + group.value}
                  >
                    <div
                      style={{
                        marginRight: itemIndex === 0 ? "2px" : 0,
                      }}
                      className="w-[1px] h-[5px] bg-[--text-header-color]"
                    />
                    {item.unit === TimelineUnit.MONTH
                      ? monthNames[item.value - 1].substring(0, 3).toUpperCase()
                      : item.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            style={{
              left: currentEleLeft + 2.5 + "px",
              // transition: "all 0.5s ease",
            }}
            className="absolute top-0 h-full bg-[--btn-ok-bg] w-[1.5px]"
          >
            <div
              className="bg-[--btn-ok-bg] absolute flex items-center justify-center rounded-md
              -translate-x-[25px] w-[50px] py-[1px] text-[0.7em] text-[white] select-none"
            >
              {moment().format("MMM DD").toUpperCase()}
            </div>
          </div>
        </div>
        <ProjectDetailsDrawer project={selectedProject} />
      </div>
    </div>
  );
}
