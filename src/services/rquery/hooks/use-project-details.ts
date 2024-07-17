import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import { Project, ProjectsService } from "@/services/api/projects-service";
import { WorkspaceDetails } from "@/services/api/workspaces-service";

async function getProjectDetails({
  queryKey,
}: {
  queryKey: any;
}): Promise<Project | null> {
  const workspaceId = queryKey[1];
  const projectSlug = queryKey[2];
  const response = await ProjectsService.GetProjectDetails(
    workspaceId,
    projectSlug
  );
  if (response.status === "fail") {
    return Promise.reject(new Error(response.error));
  }
  return response.data.project;
}

const useProjectDetails = (
  workspace: WorkspaceDetails | null,
  projectSlug: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      QUERY_KEYS.USE_PROJECT_DETAILS,
      workspace?.general_information.id,
      projectSlug,
    ],
    queryFn: getProjectDetails,
    enabled: !!workspace,
  });
  return {
    details: data ?? null,
    isLoading,
    error,
  };
};

export default useProjectDetails;
