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
  const response = await ProjectsService.GetProjectsByWorkspaceId(id);
  if (response.status === "success") {
    return response.data.projects ?? [];
  }
  return [];
}

const useProjects = (workspace: WorkspaceDetails | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_PROJECTS, workspace?.general_information.id],
    queryFn: getAllProjects,
    enabled: !!workspace,
  });
  return {
    projects: data ?? [],
    isLoadingProjects: isLoading,
    getProjectsError: error,
  };
};

export default useProjects;
