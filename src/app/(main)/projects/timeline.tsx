"use client";

import { Project } from "@/db/repositories/projects.repo";
import { monthNames } from "@/lib/timeline/datetime";
import useTimeline, { TimelineUnit } from "@/lib/timeline/use-timeline";
import { useEffect, useRef, useState } from "react";

export default function Timeline({ projects }: { projects: Project[] }) {
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
    if (projectsPos.length > 0 && calendarDivRef.current) {
      calendarDivRef.current.scrollTo({
        left: projectsPos[0].start / 2,
        behavior: "smooth",
      });
    }
  }, [projectsPos]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1 bg-[red] relative">
        <div
          ref={calendarDivRef}
          className="w-full h-full flex flex-row bg-[--primary] overflow-x-auto relative"
        >
          <div
            style={{
              width: calendarDivRef.current
                ? calendarDivRef.current.scrollWidth + "px"
                : 0,
            }}
            className="left-0 top-[100px] z-[500] flex flex-col gap-[20px] overflow-x-auto absolute"
          >
            {projectsPos?.length > 0 &&
              projectsPos.map((pos) => (
                <div
                  key={pos.project.id}
                  style={{
                    marginLeft: pos.start + "px",
                    width: pos.end - pos.start + "px",
                  }}
                  className="h-[50px] bg-[--primary] shadow-sm text-[0.85rem]
                  flex items-center px-[10px] rounded-md border-solid border-[1px] border-[--border-color]"
                >
                  {pos.project.name}
                </div>
              ))}
          </div>
          {groups.map((group) => (
            <div
              className="flex flex-col items-start border-r-solid border-r-[1px] border-r-[--border-color] px-[10px]"
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
