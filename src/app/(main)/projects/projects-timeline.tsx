"use client";

import { Project } from "@/db/repositories/projects.repo";
import moment from "moment";
import Timeline from "./timeline";

export default function ProjectsTimeline({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  const groups = projects.map((p) => {
    return {
      id: p.id,
      title: p.name,
    };
  });

  const items = projects.map((p) => {
    return {
      id: p.id,
      group: p.id,
      title: p.name,
      start_time: moment(p.startDate),
      end_time: moment(p.targetDate),
      canMove: true,
      canResize: true,
    };
  });

  return (
    <div className="w-full h-full flex flex-col">
      <Timeline projects={projects} />
    </div>
  );
}
