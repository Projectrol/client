import { baseAxios } from "./base-axios";

export type UserNotficationsSettings = {
  user_id: number;
  is_via_inbox: boolean;
  is_via_email: boolean;
  task_noti_settings: string;
  project_noti_settings: string;
  event_noti_settings: string;
  event_notice_before: number;
};

export type UpsertNotiSettingsInput = {
  is_via_inbox: boolean;
  is_via_email: boolean;
  task_noti_settings: string;
  project_noti_settings: string;
  event_noti_settings: string;
  event_notice_before: number;
};

export const NotificationsService = {
  async GetUserNotificationsSettings(): Promise<
    | {
        status: "success";
        data: {
          settings: UserNotficationsSettings;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.get("/notifications/user-settings", {
        withCredentials: true,
      });
      const data = response.data as { settings: UserNotficationsSettings };
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
  async UpdateUserNotificationsSettings(
    input: UpsertNotiSettingsInput
  ): Promise<
    | {
        status: "success";
        data: {
          settings: UserNotficationsSettings;
        };
      }
    | {
        status: "fail";
        error: string;
      }
  > {
    try {
      const response = await baseAxios.patch(
        "/notifications/user-settings",
        input,
        {
          withCredentials: true,
        }
      );
      const data = response.data as { settings: UserNotficationsSettings };
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
