import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {
  Permission,
  WorkspacesService,
} from "@/services/api/workspaces-service";
import { TasksServices } from "@/services/api/tasks-services";

async function getProjectTasks({
  queryKey,
}: {
  queryKey: any;
}): Promise<any[]> {
  const workspaceId = queryKey[1];
  const projectSlug = queryKey[2];
  const response = await TasksServices.GetProjectTasks(
    workspaceId,
    projectSlug
  );
  if (response.status === "success") {
    return response.data.tasks ?? [];
  }
  return [];
}

const useProjectTasks = (workspaceId?: number, projectSlug?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_PROJECT_TASKS, workspaceId, projectSlug],
    queryFn: getProjectTasks,
    enabled: !!workspaceId && !!projectSlug,
  });
  return {
    tasks: data ?? [],
    isLoadingProjectTasks: isLoading,
    getProjectTasksError: error,
  };
};

export default useProjectTasks;
