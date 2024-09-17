import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import { WorkspaceDetails } from "@/services/api/workspaces-service";
import { Project, ProjectsService } from "@/services/api/projects-service";

async function getAllProjects({
  queryKey,
}: {
  queryKey: any;
}): Promise<Project[]> {
  const id = queryKey[1];
  const q = queryKey[2];
  const response = await ProjectsService.GetProjectsByWorkspaceId(id, q);
  if (response.status === "success") {
    return response.data.projects ?? [];
  }
  return [];
}

const useProjects = (
  workspace: WorkspaceDetails | null,
  q: string = "*",
  enabled: boolean = true,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_PROJECTS, workspace?.general_information.id, q],
    queryFn: getAllProjects,
    enabled: !!workspace && enabled,
  });
  return {
    projects: data ?? [],
    isLoadingProjects: isLoading,
    getProjectsError: error,
  };
};

export default useProjects;
