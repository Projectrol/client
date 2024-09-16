"use client";

import ProjectsTable from "@/app/(layout)/(main-layout)/[ws-slug]/projects/components/projects-table";
import Loading from "@/app/loading";
import { State } from "@/services/redux/store";
import useProjects from "@/services/rquery/queries/useProjects";
import { useSelector } from "react-redux";

export default function ProjectsToolbarModal() {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { projects, isLoadingProjects } = useProjects(workspaceSlice.workspace);

  if (isLoadingProjects) {
    return <Loading />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <ProjectsTable
        showToolbar={false}
        loading={isLoadingProjects}
        projects={projects}
      />
    </div>
  );
}
