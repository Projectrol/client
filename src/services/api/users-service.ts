import { Workspace } from "@/db/repositories/workspaces.repo";
import { baseAxios } from "./base-axios";

export type UserSettings = {
  name: string;
  theme: "LIGHT" | "DARK";
  phone_no?: string;
  avatar?: string;
};

export type User = {
  id: number;
  email: string;
  settings: UserSettings;
};

export const UsersService = {
  async Login(
    email: string,
    password: string
  ): Promise<
    | {
        status: "success";
        data: User;
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    const body = {
      email,
      password,
    };
    try {
      const response = await baseAxios.post("/users/login", body, {
        withCredentials: true,
      });
      const data = response.data.user as User;
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
  async Authenticate(): Promise<
    | {
        status: "success";
        data: User;
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
      const data = response.data.user as User;
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
  async Logout(): Promise<boolean> {
    try {
      await baseAxios.get("/users/logout", {
        withCredentials: true,
      });
      return true;
    } catch (err: any) {
      return false;
    }
  },
  async UpdateUserSettings(settings: UserSettings): Promise<
    | {
        status: "success";
        data: { settings: UserSettings };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.patch("/users/settings", settings, {
        withCredentials: true,
      });
      const data = response.data as { settings: UserSettings };
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
