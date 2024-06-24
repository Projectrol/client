"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import ProjectEditor from "@/components/project-editor";
import { db } from "@/db";
import { Project } from "@/db/repositories/projects.repo";
import { State } from "@/services/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";

export default function ProjectView({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const router = useRouter();

  useEffect(() => {
    const getProject = async () => {
      const project = await db.projects.getBySlug(slug);
      if (project) {
        setProject(project);
      }
    };
    getProject();
  }, [slug]);

  return (
    <div className="w-full flex flex-col">
      <MainBodyHeader title="">
        {project && workspaceSlice.workspace && (
          <>
            <span
              onClick={() => router.push("/projects?view_mode=table")}
              className="select-none text-[--base] cursor-pointer hover:underline"
            >
              {workspaceSlice.workspace.name}
            </span>
            <ChevronRightIcon fontSize="small" htmlColor="var(--base)" />
            <span className="select-none text-[--base]">{project.name}</span>
          </>
        )}
      </MainBodyHeader>
      <div className="w-full">
        {project && <ProjectEditor initValue={project} mode="edit" />}
      </div>
    </div>
  );
}
