import axios from "axios";
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

export type Task = {
  nanoid: string;
  project_id: number;
  title: string;
  description: string;
  status: CardStatus;
  label: string;
  is_published: boolean;
  created_at: string;
  created_by: number;
};

export type TaskLog = {
  created_by: number;
  changed_field: string;
  old_value: string;
  new_value: string;
  created_at: string;
};

export type TaskDetails = {
  task: Task;
  task_logs: TaskLog[];
};

export type CreateProjectTaskData = {
  project_slug: string;
  title: string;
  description: string;
  status: CardStatus;
  label: Label;
  is_published: boolean;
};

export type UpdateProjectTaskData = {
  changed_field: string;
  value: string;
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
  async CreateProjectTask(
    workspaceId: number,
    projectSlug: string,
    data: CreateProjectTaskData
  ) {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/workspaces/${workspaceId}/tasks/${projectSlug}`;
    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
      });
      return true;
    } catch (err) {
      return false;
    }
  },
  async UpdateProjectTask(
    workspaceId: number,
    projectSlug: string,
    nanoid: string,
    bodyData: UpdateProjectTaskData
  ): Promise<
    | {
        status: "success";
        data: { task: Task };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/workspaces/${workspaceId}/tasks/${projectSlug}/${nanoid}`;
    try {
      const response = await axios.patch(url, bodyData, {
        withCredentials: true,
      });
      const data = response.data as { task: Task };
      return {
        status: "success",
        data,
      };
    } catch (err: any) {
      return {
        status: "fail",
        error: err.response.data.error,
      };
    }
  },
  async GetrojectTaskDetails(
    workspaceId: number,
    projectSlug: string,
    nanoid: string
  ): Promise<
    | {
        status: "success";
        data: { details: TaskDetails };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/workspaces/${workspaceId}/tasks/${projectSlug}/${nanoid}`;
    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      const data = response.data as { details: TaskDetails };
      return {
        status: "success",
        data,
      };
    } catch (err: any) {
      return {
        status: "fail",
        error: err.response.data.error,
      };
    }
  },
};
