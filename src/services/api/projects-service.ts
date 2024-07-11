import { baseAxios } from "./base-axios";

export type CreateProjectRequest = {
  workspace_id: number;
  name: string;
  summary: string;
  description: string;
  dtstart: number;
  dtend: number;
};

export type Project = {
  id: number;
  workspace_id: number;
  created_by: number;
  name: string;
  slug: string;
  summary: string;
  description: string;
  dtstart: string;
  dtend: string;
  created_at: string;
};

export const ProjectsService = {
  async GetProjectsByWorkspaceId(id: number): Promise<
    | {
        status: "success";
        data: { projects: Project[] | null };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(`/workspaces/${id}/projects`, {
        withCredentials: true,
      });
      const data = response.data as { projects: Project[] | null };
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
  async CreateProject(
    workspaceId: number,
    bodyData: CreateProjectRequest
  ): Promise<
    | {
        status: "success";
        data: any;
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.post(
        `/workspaces/${workspaceId}/projects/create`,
        bodyData,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
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
  async GetProjectDetails(
    workspaceId: number,
    workspaceSlug: string,
    projectSlug: string
  ): Promise<
    | {
        status: "success";
        data: {
          project: Project;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/projects/${workspaceSlug}/${projectSlug}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { project: Project };
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
