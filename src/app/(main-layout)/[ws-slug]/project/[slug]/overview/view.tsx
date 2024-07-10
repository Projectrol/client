"use client";

import ProjectEditor from "@/components/project-editor";
import { Project, ProjectsService } from "@/services/api/projects-service";
import { State } from "@/services/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectOverviewView({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const workspaceSlice = useSelector((state: State) => state.workspace);

  useEffect(() => {
    if (workspaceSlice.workspace && slug) {
      const workspaceSlug = workspaceSlice.workspace.general_information.slug;
      const getProject = async () => {
        const response = await ProjectsService.GetProjectDetails(
          workspaceSlug,
          slug
        );
        if (response.status === "success") {
          setProject(response.data.project);
        }
      };
      getProject();
    }
  }, [slug, workspaceSlice]);

  return (
    <div className="w-full">
      {project && <ProjectEditor initValue={project} mode="edit" />}
    </div>
  );
}
