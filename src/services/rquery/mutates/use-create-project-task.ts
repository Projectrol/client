import {
  CreateProjectTaskData,
  TasksServices,
} from "@/services/api/tasks-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createProjectTask(
  workspaceId: number,
  projectSlug: string,
  data: CreateProjectTaskData
) {
  const response = await TasksServices.CreateProjectTask(
    workspaceId,
    projectSlug,
    data
  );
  if (!response) {
    throw new Error("Cannot create project task");
  }
  return true;
}

export default function useCreateProjectTask() {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess, error } = useMutation({
    mutationFn: (data: {
      workspaceId: number;
      projectSlug: string;
      bodyData: CreateProjectTaskData;
    }) => createProjectTask(data.workspaceId, data.projectSlug, data.bodyData),
  });
  return {
    mutateAsync,
    isSuccess,
    error,
  };
}
