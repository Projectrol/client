import { baseAxios } from "./base-axios";

export type Workspace = {
  id: number;
  nanoid: string;
  name: string;
  slug: string;
};

export type WorkspaceSettings = {
  logo: string;
};

export type WorkspaceDetails = {
  general_information: Workspace;
  settings: WorkspaceSettings;
};

export type ResourceTag =
  | "workspaces"
  | "tasks"
  | "projects"
  | "roles"
  | "members-roles";
export type PermissionType =
  | "can_read"
  | "can_create"
  | "can_delete"
  | "can_update";

export type Permission = {
  id: number;
  resource_tag: ResourceTag;
  title: string;
  description: string;
  can_read?: boolean;
  can_create?: boolean;
  can_delete?: boolean;
  can_update?: boolean;
};

export type WorkspaceRole = {
  id: number;
  workspace_id: number;
  role_name: string;
  permissions: Permission[];
};

export type UpdateRolePermissionRequest = {
  role_id: number;
  resource_tag: string;
  action: string;
  update_type: "remove" | "add";
};

export type CreateNewRoleRequest = {
  workspace_id: number;
  role_name: string;
  permission_ids: number[];
};

export type WorkspaceMember = {
  id: number;
  email: string;
  role_id: number;
  name?: string;
  avatar?: string;
  phone_no?: string;
};

export const WorkspacesService = {
  async CreateWorkspace(bodyData: { name: string; logo: string }): Promise<
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
      const response = await baseAxios.post("/workspaces", bodyData, {
        withCredentials: true,
      });
      const data = response.data;
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
  async Authenticate(): Promise<
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
      const response = await baseAxios.get("/authenticate", {
        withCredentials: true,
      });
      const data = response.data;
      return {
        status: "success",
        data: data.user,
      };
    } catch (err: any) {
      return {
        status: "fail",
        error: err.response.data.error,
      };
    }
  },
  async GetUserWorkspaces(): Promise<
    | {
        status: "success";
        data: {
          workspaces: Workspace[];
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get("/users/workspaces", {
        withCredentials: true,
      });
      const data = response.data;
      return {
        status: "success",
        data: {
          workspaces: data.workspaces,
        },
      };
    } catch (err: any) {
      return {
        status: "fail",
        error: err.response.data.error,
      };
    }
  },
  async GetWorkspaceDetails(id: number): Promise<
    | {
        status: "success";
        data: {
          details: WorkspaceDetails;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(`/workspaces/${id}`, {
        withCredentials: true,
      });
      const data = response.data as { details: WorkspaceDetails };
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
  async GetPermissions(): Promise<
    | {
        status: "success";
        data: {
          permissions: Permission[];
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(`/permissions`, {
        withCredentials: true,
      });
      const data = response.data as { permissions: Permission[] };
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
  async CreateNewRole(
    workspaceId: number,
    bodyData: CreateNewRoleRequest
  ): Promise<
    | {
        status: "success";
        data: {
          id: number;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.post(
        `/workspaces/${workspaceId}/roles`,
        bodyData,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { id: number };
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
  async UpdateRolePermission(
    workspaceId: number,
    bodyData: UpdateRolePermissionRequest
  ): Promise<
    | {
        status: "success";
        data: {
          role: WorkspaceRole;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.patch(
        `/workspaces/${workspaceId}/roles`,
        bodyData,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { role: WorkspaceRole };
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
  async GetWokspaceRoles(workspaceId: number): Promise<
    | {
        status: "success";
        data: {
          roles: WorkspaceRole[];
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(`/workspaces/${workspaceId}/roles`, {
        withCredentials: true,
      });
      const data = response.data as { roles: WorkspaceRole[] };
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
  async GetUserRoleInWorkspace(workspaceId: number): Promise<
    | {
        status: "success";
        data: {
          role: WorkspaceRole;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/user/role`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { role: WorkspaceRole };
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
  async GetWorkspaceMembers(workspaceId: number): Promise<
    | {
        status: "success";
        data: { members: WorkspaceMember[] };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get(
        `/workspaces/${workspaceId}/members`,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { members: WorkspaceMember[] };
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
