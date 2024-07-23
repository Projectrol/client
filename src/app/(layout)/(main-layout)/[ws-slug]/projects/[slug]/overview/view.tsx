"use client";

import Loading from "@/app/loading";
import ProjectEditor from "@/components/project-editor";
import { State } from "@/services/redux/store";
import useProjectDetails from "@/services/rquery/hooks/use-project-details";
import { useSelector } from "react-redux";

export default function ProjectOverviewView({ slug }: { slug: string }) {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { details, error, isLoading } = useProjectDetails(
    workspaceSlice.workspace,
    slug
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && error) {
    return <h1>{error.message}</h1>;
  }

  if (!isLoading && details) {
    return (
      <div className="w-full">
        {details && <ProjectEditor initValue={details.project} mode="edit" />}
      </div>
    );
  }
}
