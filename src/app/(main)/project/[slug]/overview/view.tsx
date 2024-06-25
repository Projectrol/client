"use client";

import ProjectEditor from "@/components/project-editor";
import { db } from "@/db";
import { Project } from "@/db/repositories/projects.repo";
import { useEffect, useState } from "react";

export default function ProjectOverviewView({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);

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
    <div className="w-full">
      {project && <ProjectEditor initValue={project} mode="edit" />}
    </div>
  );
}
