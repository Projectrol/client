import { baseAxios } from "./base-axios";

export enum CardStatus {
  "TODO" = "TODO",
  "IN_PROGRESS" = "IN_PROGRESS",
  "DONE" = "DONE",
  "CANCELLED" = "CANCELLED",
}

export enum Label {
  "BUG" = "BUG",
  "FEATURE" = "FEATURE",
  "IMPROVEMENT" = "IMPROVEMENT",
}

export const Priority: { [key: number]: string } = {
  0: "NO_PRIORTY",
  1: "URGENT",
  2: "HIGH",
  3: "MEDIUM",
  4: "LOW",
};

export const TasksServices = {
  async GetProjectTasks(
    workspaceId: number,
    projectSlug: string
  ): Promise<
    | {
        status: "success";
        data: { tasks: any[] };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/tasks/${projectSlug}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { tasks: any[] };
      return {
        status: "success",
        data: data,
      };
    } catch (err: any) {
      return {
        status: "fail",
        error: err.response.data.error,
      };
    }
  },
};
