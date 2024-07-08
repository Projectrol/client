import {
  NotificationsService,
  UserNotficationsSettings,
} from "@/services/api/notifications.service";
import { QUERY_KEYS } from "@/services/rquery/consts";
import { useQuery } from "@tanstack/react-query";

const getWorkspaceSettings =
  async (): Promise<UserNotficationsSettings | null> => {
    const response = await NotificationsService.GetUserNotificationsSettings();
    if (response.status === "fail") {
      return null;
    }
    return response.data.settings;
  };

export default function useUserNotificationsSettings() {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_USER_NOTIFICATIONS_SETTINGS],
    queryFn: getWorkspaceSettings,
  });

  return {
    settings: data ?? null,
    isLoading,
    error,
  };
}
