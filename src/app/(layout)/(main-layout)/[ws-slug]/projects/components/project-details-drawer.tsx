"use client";

import { StatusColors } from "@/configs/status-colors";
import { Project } from "@/db/repositories/projects.repo";
import moment from "moment";

export default function ProjectDetailsDrawer({
  project,
}: {
  project: Project | null;
}) {
  return (
    <div
      style={{
        transform: project ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.25s ease",
      }}
      className="absolute right-[0px] top-[0px] h-full w-[350px] flex flex-col shadow-md
                bg-[--primary] z-[600] border-solid border-l-[1px] border-l-[--border-color]"
    >
      <div className="w-full p-[30px] text-[0.85rem] text-[--base] font-medium">
        {project?.name}
      </div>
      <div className="w-full h-[1px] border-solid border-b-[1px] border-b-[--border-color]" />
      <div className="w-full p-[30px] text-[0.75rem] font-medium text-[--base] opacity-90">
        <div className="w-full flex flex-col gap-[20px]">
          <div className="w-full flex flex-row">
            <div className="w-[40%]">Status</div>
            <div className="flex-1 flex items-center gap-[8px]">
              <div
                style={{
                  background: project
                    ? StatusColors[project.status]
                    : "var(--primary)",
                }}
                className="w-[15px] aspect-square rounded-full"
              />
              {project?.status.replaceAll("_", " ")}
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[40%]">Start date</div>
            <div className="flex-1 flex items-center gap-[8px]">
              {project && moment(project.startDate).format("MMM DD, YYYY")}
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[40%]">Target date</div>
            <div className="flex-1 flex items-center gap-[8px]">
              {project && moment(project.targetDate).format("MMM DD, YYYY")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
