"use client";

import { monthNames } from "@/lib/datetime";
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
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import clsx from "clsx";
import useTimeline, { TimelineUnit } from "@/hooks/use-timeline";
import { Project } from "@/services/api/projects-service";

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
  const [mouseOverProjectId, setMouseOverProjectId] = useState<number | null>(
    null
  );
  const { groups, setGroupingMode, groupingMode, monthsInYears } = useTimeline({
    initGroupingMode: {
      mode: "months in years",
      from_year: 2024,
      to_year: 2026,
    },
  });
  const [eleOffsetLRangeList, setEleOffsetLRangeList] = useState<
    { eleId: string; offsetLeft: number }[][]
  >([]);
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
      monthsInYears.length > 0 &&
      projects.length > 0
    ) {
      const projectsPos: any[] = [];
      projects.forEach((project) => {
        const startDate = new Date(project.dtstart);
        const endDate = new Date(project.dtend);
        const start_month = startDate.getMonth() + 1;
        const start_day = startDate.getDate();
        const start_id =
          start_day + "_" + start_month + "_" + startDate.getFullYear();
        const end_month = endDate.getMonth() + 1;
        const end_day = endDate.getDate();
        const end_id =
          end_day + "_" + end_month + "_" + startDate.getFullYear();
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
  }, [monthsInYears, projects]);

  useEffect(() => {
    if (monthsInYears.length > 0) {
      const groupItemsIds: string[] = [];
      monthsInYears.forEach((year) => {
        year.groups.forEach((group) => {
          group.items.forEach((item) => {
            const id = item.value + "_" + group.value + "_" + year.value;
            groupItemsIds.push(id);
          });
        });
      });
      setGroupItemsIds(groupItemsIds);
    }
  }, [monthsInYears]);

  useEffect(() => {
    if (groupItemsIds.length > 0) {
      const currentDate = new Date();
      const currentEleId =
        currentDate.getDate() +
        "_" +
        (currentDate.getMonth() + 1) +
        "_" +
        currentDate.getFullYear();
      const currentEle = document.getElementById(currentEleId);
      if (!currentEle) return;
      const offsetLeft = currentEle.offsetLeft;
      setCurrentEleLeft(offsetLeft);

      if (calendarDivRef.current) {
        const calendarWidth = calendarDivRef.current?.clientWidth;
        let offsetValue = 1.5;
        if (offsetLeft >= calendarWidth * 2) {
          offsetValue = 1.08;
        }
        calendarDivRef.current.scrollTo({
          left: offsetLeft / offsetValue,
          behavior: "smooth",
        });
      }

      const offsetLRangeList: { eleId: string; offsetLeft: number }[][] = [];
      const offsetList: { eleId: string; offsetLeft: number }[] = [];
      groupItemsIds.forEach((id) => {
        const ele = document.getElementById(id);
        if (ele) {
          offsetList.push({
            eleId: id,
            offsetLeft: ele.offsetLeft,
          });
        }
      });
      offsetList.sort((a, b) => a.offsetLeft - b.offsetLeft);
      let currentSubList: { eleId: string; offsetLeft: number }[] = [];
      offsetList.forEach((item) => {
        if (currentSubList.length < 100) {
          currentSubList.push(item);
        } else {
          offsetLRangeList.push(currentSubList);
          currentSubList = [item];
        }
      });
      setEleOffsetLRangeList(offsetLRangeList);
    }
  }, [groupItemsIds]);

  const getStartTargetDateByPos = (x: number, eventIndex: number) => {
    let startEleIndex = "";
    let startDate: Date | null = null;
    let targetDate: Date | null = null;
    const targetList = eleOffsetLRangeList.find(
      (subList) =>
        subList[subList.length - 1].offsetLeft >= x &&
        subList[0].offsetLeft <= x
    );
    if (!targetList) {
      return { startDate, targetDate };
    }
    for (let i = 0; i < targetList.length; i++) {
      const ele = targetList[i];
      if (ele) {
        if (Math.abs(x - ele.offsetLeft) <= 5) {
          startEleIndex = targetList[i].eleId;
          break;
        }
      }
    }

    if (startEleIndex !== "") {
      const project = projectsPos[eventIndex].project;
      const oldStartDate = moment(project.dtstart);
      const oldTargetDate = moment(project.dtend);
      const diff = oldTargetDate.diff(oldStartDate, "days");
      const monthIndex = parseInt(startEleIndex.split("_")[1]) - 1;
      const day = parseInt(startEleIndex.split("_")[0]);
      const year = parseInt(startEleIndex.split("_")[2]);
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
      const start_id =
        start_day + "_" + start_month + "_" + startDate.getFullYear();
      const end_month = targetDate.getMonth() + 1;
      const end_day = targetDate.getDate();
      const end_id = end_day + "_" + end_month + "_" + startDate.getFullYear();
      const startEle = document.getElementById(start_id);
      const endEle = document.getElementById(end_id);

      if (startEle && endEle) {
        const newProjectsPos = [...projectsPos];
        newProjectsPos[index].start = startEle.offsetLeft + 2.5;
        newProjectsPos[index].end = endEle.offsetLeft + 2.5;
        setProjectsPos(newProjectsPos);
      }

      const project = projectsPos[index].project;
      // const respone = await db.projects.updateProjectDate(
      //   project.id,
      //   startDate,
      //   targetDate
      // );

      // if (!respone) {
      //   const newProjectsPos = [...projectsPos];
      //   newProjectsPos[index].start = oldPos.start;
      //   newProjectsPos[index].end = oldPos.end;
      //   setProjectsPos(newProjectsPos);
      // }
    }
  };

  const handleOnDragging = (currentX: number | null, index: number) => {
    if (!currentX) return;

    setSelectedProject(projectsPos[index].project);

    const { startDate, targetDate } = getStartTargetDateByPos(currentX, index);
    if (startDate && targetDate) {
      setDraggingOnDate({
        eventIndex: index,
        start: startDate,
        target: targetDate,
      });
    }
  };

  const handleOnResizeFinish = async (newWidth: number, index: number) => {
    const oldPos = Object.assign({}, projectsPos[index]);
    const oldWidth = oldPos.end - oldPos.start;
    let newTargetX = 0;
    if (oldWidth > newWidth) {
      newTargetX = oldPos.end - (oldWidth - newWidth);
    } else {
      newTargetX = oldPos.end + newWidth - oldWidth;
    }
    let targetEleIndex = "";
    let targetDate: Date | null = null;

    const targetList = eleOffsetLRangeList.find(
      (subList) =>
        subList[subList.length - 1].offsetLeft >= newTargetX &&
        subList[0].offsetLeft <= newTargetX
    );
    if (!targetList) return;

    for (let i = 0; i < targetList.length; i++) {
      const ele = targetList[i];
      if (ele) {
        if (Math.abs(newTargetX - ele.offsetLeft) <= 5) {
          targetEleIndex = targetList[i].eleId;
          break;
        }
      }
    }

    if (targetEleIndex !== "") {
      const monthIndex = parseInt(targetEleIndex.split("_")[1]) - 1;
      const day = parseInt(targetEleIndex.split("_")[0]);
      const year = parseInt(targetEleIndex.split("_")[2]);
      targetDate = new Date(year, monthIndex, day);
    }

    const startDate = new Date(projects[index].dtstart);

    if (startDate && targetDate) {
      const start_month = startDate.getMonth() + 1;
      const start_day = startDate.getDate();
      const start_id =
        start_day + "_" + start_month + "_" + startDate.getFullYear();
      const end_month = targetDate.getMonth() + 1;
      const end_day = targetDate.getDate();
      const end_id = end_day + "_" + end_month + "_" + startDate.getFullYear();
      const startEle = document.getElementById(start_id);
      const endEle = document.getElementById(end_id);

      if (startEle && endEle) {
        const newProjectsPos = [...projectsPos];
        newProjectsPos[index].start = startEle.offsetLeft + 2.5;
        newProjectsPos[index].end = endEle.offsetLeft + 2.5;
        setProjectsPos(newProjectsPos);
      }

      const project = projectsPos[index].project;
      // const respone = await db.projects.updateProjectDate(
      //   project.id,
      //   startDate,
      //   targetDate
      // );

      // if (!respone) {
      //   const newProjectsPos = [...projectsPos];
      //   newProjectsPos[index].start = oldPos.start;
      //   newProjectsPos[index].end = oldPos.end;
      //   setProjectsPos(newProjectsPos);
      // }
    }
  };

  const handleOnResizing = async (newWidth: number, index: number) => {
    const oldPos = Object.assign({}, projectsPos[index]);
    const oldWidth = oldPos.end - oldPos.start;
    let newTargetX = 0;
    if (oldWidth > newWidth) {
      newTargetX = oldPos.end - (oldWidth - newWidth);
    } else {
      newTargetX = oldPos.end + newWidth - oldWidth;
    }
    let targetEleIndex = "";
    let targetDate: Date | null = null;

    const targetList = eleOffsetLRangeList.find(
      (subList) =>
        subList[subList.length - 1].offsetLeft >= newTargetX &&
        subList[0].offsetLeft <= newTargetX
    );
    if (!targetList) return;

    for (let i = 0; i < targetList.length; i++) {
      const ele = targetList[i];
      if (ele) {
        if (Math.abs(newTargetX - ele.offsetLeft) <= 5) {
          targetEleIndex = targetList[i].eleId;
          break;
        }
      }
    }

    if (targetEleIndex !== "") {
      const monthIndex = parseInt(targetEleIndex.split("_")[1]) - 1;
      const day = parseInt(targetEleIndex.split("_")[0]);
      const year = parseInt(targetEleIndex.split("_")[2]);
      targetDate = new Date(year, monthIndex, day);
    }

    if (targetDate) {
      setSelectedProject(oldPos.project);
      setDraggingOnDate({
        eventIndex: index,
        start: new Date(oldPos.project.dtstart),
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
      <div className="w-full flex-1 relative px-[0px]">
        <div
          className="w-[300px] h-full bg-[--primary] absolute flex flex-col
                        border-solid border-r-[1px] border-r-[--border-color]"
        >
          <div
            className="w-full h-[48px] border-solid
           border-b-[1px] border-b-[--border-color]"
          ></div>
          <div className="w-full flex flex-col">
            {projectsPos.map((pos, i) => (
              <div
                onClick={() => {
                  if (calendarDivRef && calendarDivRef.current) {
                    calendarDivRef.current.scrollTo({
                      left: pos.start,
                      behavior: "smooth",
                    });
                  }
                  setSelectedProject(pos.project);
                }}
                onMouseOver={() => setMouseOverProjectId(pos.project.id)}
                onMouseLeave={() => setMouseOverProjectId(null)}
                key={pos.project.id}
                className={clsx(
                  {
                    "w-[100%] opacity-90 transition-colors text-[--base] px-[20px] h-[50px] text-[0.8rem] font-semibold flex items-center select-none":
                      true,
                  },
                  {
                    "bg-[--selected-ok-bg]":
                      selectedProject?.id === pos.project.id,
                  },

                  {
                    "bg-[--hover-bg]":
                      mouseOverProjectId !== null &&
                      mouseOverProjectId === pos.project.id,
                  }
                )}
              >
                <span
                // onClick={() =>
                //   router.push(`/project/${pos.project.slug}/overview`)
                // }
                // className="hover:underline cursor-pointer w-[70%] whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {pos.project.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
          style={
            {
              // marginRight: selectedProject ? "355px" : 0,
            }
          }
          ref={calendarDivRef}
          className="h-full flex flex-row bg-[--primary] overflow-x-auto relative ml-[300px]"
        >
          <DndContext
            modifiers={[snapToGridModifier, restrictToParentElement]}
            sensors={sensors}
          >
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
              className="left-0 top-[0px] z-[500] flex flex-col gap-[0px] overflow-x-auto absolute pt-[48px]"
            >
              {projectsPos?.length > 0 &&
                projectsPos.map((pos, i) => (
                  <div
                    onMouseOver={() => setMouseOverProjectId(pos.project.id)}
                    onMouseLeave={() => setMouseOverProjectId(null)}
                    onClick={() => setSelectedProject(pos.project)}
                    key={pos.project.id}
                    className={clsx(
                      {
                        "w-full h-[50px] flex items-center transition-colors":
                          true,
                      },
                      {
                        "hover:bg-[--hover-bg]":
                          selectedProject?.id !== pos.project.id,
                      },
                      {
                        "bg-[--hover-bg]":
                          mouseOverProjectId !== null &&
                          mouseOverProjectId === pos.project.id,
                      },
                      {
                        "bg-[--selected-ok-bg]":
                          selectedProject?.id === pos.project.id,
                      }
                    )}
                  >
                    <TimelineEvent
                      onMouseOver={() => setMouseOverProjectId(pos.project.id)}
                      onMouseLeave={() => setMouseOverProjectId(null)}
                      onClick={() => setSelectedProject(pos.project)}
                      selectedProject={selectedProject}
                      onDragging={(currentX) => handleOnDragging(currentX, i)}
                      onDrop={(newX) => handleDropEventTimeline(newX, i)}
                      onResizeFinish={(width) => handleOnResizeFinish(width, i)}
                      onResizing={(width) => {
                        handleOnResizing(width, i);
                      }}
                      pos={pos}
                      draggingOnDate={draggingOnDate}
                    />
                  </div>
                ))}
            </div>
          </DndContext>

          {groupingMode.mode === "months in years" &&
            monthsInYears.map((year) =>
              year.groups.map((group) => (
                <div
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setSelectedProject(null);
                  }}
                  className="flex flex-col items-start border-dashed border-r-[1px] 
                        border-r-[--border-color] select-none"
                  key={group.value + "_" + year.value}
                >
                  <div className="text-[0.65rem] font-semibold text-[--base] py-[5px] pl-[6px]">
                    {group.unit === TimelineUnit.MONTH
                      ? monthNames[group.value - 1]
                          .substring(0, 3)
                          .toUpperCase() +
                        " / " +
                        year.value
                      : group.value}
                  </div>
                  <div className="flex flex-row border-dashed border-b-[1px] border-b-[--border-color]">
                    {group.items.map((item, itemIndex) => (
                      <div
                        style={{
                          opacity:
                            item.value % 5 === 0 || item.value === 1 ? 1 : 0,
                          marginRight:
                            itemIndex === group.items.length - 1 ? "10px" : 0,
                          width: itemIndex === 0 ? "10px" : "5px",
                          alignItems: itemIndex === 0 ? "flex-end" : "center",
                        }}
                        id={item.value + "_" + group.value + "_" + year.value}
                        className="text-[0.7rem] text-[--text-header-color] flex flex-col"
                        key={item.value + "_" + group.value + "_" + year.value}
                      >
                        <div
                          style={{
                            marginRight: itemIndex === 0 ? "2px" : 0,
                          }}
                          className="w-[1px] h-[5px] bg-[--text-header-color]"
                        />
                        {item.unit === TimelineUnit.MONTH
                          ? monthNames[item.value - 1]
                              .substring(0, 3)
                              .toUpperCase()
                          : item.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          <div
            style={{
              left: currentEleLeft + 2.5 + "px",
              // transition: "all 0.5s ease",
            }}
            className="absolute top-0 h-full bg-[--btn-ok-bg] w-[1.5px] z-[100]"
          >
            <div
              className="bg-[--btn-ok-bg] absolute flex items-center justify-center rounded-md
              -translate-x-[25px] w-[50px] py-[1px] text-[0.7em] text-[white] select-none"
            >
              {moment().format("MMM DD").toUpperCase()}
            </div>
          </div>
        </div>
        {/* <ProjectDetailsDrawer project={selectedProject} /> */}
      </div>
    </div>
  );
}
