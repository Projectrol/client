"use client";

import { Project } from "@/db/repositories/projects.repo";
import Timeline from "./timeline";

export default function ProjectsTimeline({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <Timeline projects={projects} />
    </div>
  );
}
