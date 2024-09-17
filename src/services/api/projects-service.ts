import { baseAxios } from "./base-axios";

export type CreateProjectRequest = {
  workspace_id: number;
  name: string;
  summary: string;
  description: string;
  dtstart: number;
  dtend: number;
  is_private: boolean;
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

export type ProjectDetails = {
  project: Project;
  memberIds: number[];
};

export type ProjectDocument = {
  created_by: number;
  updated_by: number;
  nanoid: string;
  name: string;
  created_at: string;
  updated_at?: string;
};

export type ProjectDocumentDetails = {
  content?: string;
} & ProjectDocument;

export const ProjectsService = {
  async GetProjectsByWorkspaceId(id: number, q: string = "*"): Promise<
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
      const response = await baseAxios.get(`/workspaces/${id}/search-projects/${q}`, {
        withCredentials: true
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
    projectSlug: string
  ): Promise<
    | {
        status: "success";
        data: {
          details: ProjectDetails;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/projects/${projectSlug}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { details: ProjectDetails };
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
  async GetProjectDocuments(
    projectSlug: string,
    workspaceId: number
  ): Promise<
    | {
        status: "success";
        data: { documents: ProjectDocument[] | null };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/documents/${projectSlug}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { documents: ProjectDocument[] | null };
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
  async GetProjectDocumentDetails(
    projectSlug: string,
    workspaceId: number,
    nanoid: number
  ): Promise<
    | {
        status: "success";
        data: { details: ProjectDocumentDetails | null };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/documents/${projectSlug}/${nanoid}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as {
        details: ProjectDocumentDetails | null;
      };
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
  async UpdateProjectDocumentDetails(
    projectSlug: string,
    workspaceId: number,
    nanoid: string,
    name: string,
    content: string
  ): Promise<
    | {
        status: "success";
        data: { details: ProjectDocumentDetails | null };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const bodyData = {
        name,
        content,
      };
      const response = await baseAxios.patch(
        `/workspaces/${workspaceId}/documents/${projectSlug}/${nanoid}`,
        bodyData,
        {
          withCredentials: true,
        }
      );
      const data = response.data as {
        details: ProjectDocumentDetails | null;
      };
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
