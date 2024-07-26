"use client";

import ProjectEditor from "@/components/project-editor";
import { useContext } from "react";
import { ProjectDetailsContext } from "../layout";

export default function ProjectOverviewView() {
  const value = useContext(ProjectDetailsContext);

  if (value.details) {
    return (
      <div className="w-full">
        <ProjectEditor initValue={value.details.project} mode="edit" />
      </div>
    );
  }
}
