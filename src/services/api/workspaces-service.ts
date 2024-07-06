import { baseAxios } from "./base-axios";

export type Workspace = {
  id: number;
  name: string;
  slug: string;
  settings: WorkspaceSettings;
};

type WorkspaceSettings = {
  logo: string;
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
      const response = await baseAxios.post("/workspaces/create", bodyData, {
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
};
