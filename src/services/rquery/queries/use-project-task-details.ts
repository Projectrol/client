import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {} from "@/services/api/projects-service";
import { TaskDetails, TasksServices } from "@/services/api/tasks-services";

async function getProjectTaskDetails({
  queryKey,
}: {
  queryKey: any;
}): Promise<TaskDetails | null> {
  const workspaceId = queryKey[1];
  const projectSlug = queryKey[2];
  const taskNanoid = queryKey[3];
  const response = await TasksServices.GetrojectTaskDetails(
    workspaceId,
    projectSlug,
    taskNanoid
  );
  if (response.status === "fail") {
    return Promise.reject(new Error(response.error));
  }
  return response.data.details;
}

const useProjectTaskDetails = (
  workspaceId?: number,
  projectSlug?: string,
  taskNanoid?: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      QUERY_KEYS.USE_PROJECT_TASK_DETAILS,
      workspaceId,
      projectSlug,
      taskNanoid,
    ],
    queryFn: getProjectTaskDetails,
    enabled: !!workspaceId && !!projectSlug && !!taskNanoid,
  });
  return {
    details: data ?? null,
    isLoading,
    error,
  };
};

export default useProjectTaskDetails;
