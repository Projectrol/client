"use client";

import { useState } from "react";
import "react-toggle/style.css";
import NotficationsToggleItem from "./components/notifications-toggle-item";
import useUserNotificationsSettings from "@/hooks/use-user-notifications-settings";
import Loading from "@/app/loading";
import NotificationsTypeSettings, {
  NotificationType,
} from "./components/notifications-type-settings";
import {
  NotificationsService,
  UpsertNotiSettingsInput,
} from "@/services/api/notifications.service";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/rquery/consts";

const NotficationsSettings = () => {
  const queryClient = useQueryClient();
  const [isViaInbox, setViaInbox] = useState(false);
  const [isViaEmail, setViaEmail] = useState(false);
  const { settings, isLoading, error } = useUserNotificationsSettings();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !settings) {
    return null;
  }

  const handleOnToggle = async (strIndex: number, type: NotificationType) => {
    const updatedUserNotiSettings = Object.assign({}, settings);
    switch (type) {
      case "event":
        updatedUserNotiSettings.event_noti_settings =
          updatedUserNotiSettings.event_noti_settings
            .split("")
            .map((value, index) => {
              if (index === strIndex) {
                if (value === "1") {
                  return "0";
                } else {
                  return "1";
                }
              } else {
                return value;
              }
            })
            .join("");
        break;
      case "project":
        updatedUserNotiSettings.project_noti_settings =
          updatedUserNotiSettings.project_noti_settings
            .split("")
            .map((value, index) => {
              if (index === strIndex) {
                if (value === "1") {
                  return "0";
                } else {
                  return "1";
                }
              } else {
                return value;
              }
            })
            .join("");
        break;
      case "task":
        updatedUserNotiSettings.task_noti_settings =
          updatedUserNotiSettings.task_noti_settings
            .split("")
            .map((value, index) => {
              if (index === strIndex) {
                if (value === "1") {
                  return "0";
                } else {
                  return "1";
                }
              } else {
                return value;
              }
            })
            .join("");
        break;
    }
    const input: UpsertNotiSettingsInput = {
      event_noti_settings: updatedUserNotiSettings.event_noti_settings,
      event_notice_before: updatedUserNotiSettings.event_notice_before,
      is_via_email: updatedUserNotiSettings.is_via_email,
      is_via_inbox: updatedUserNotiSettings.is_via_inbox,
      project_noti_settings: updatedUserNotiSettings.project_noti_settings,
      task_noti_settings: updatedUserNotiSettings.task_noti_settings,
    };
    const response = await NotificationsService.UpdateUserNotificationsSettings(
      input
    );
    if (response.status === "success") {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USE_USER_NOTIFICATIONS_SETTINGS],
      });
    }
  };

  if (!isLoading && settings) {
    return (
      <div className="w-full flex flex-col bg-[--secondary] px-[30px] py-[25px] mt-[20px] rounded-md shadow-md">
        <div className="w-full flex flex-col">
          <div className="w-full text-[1rem] text-[--base] font-semibold mb-[15px] opacity-70">
            Notifications methods
          </div>
          <div className="w-full flex flex-col gap-[30px] pt-[5px]">
            <NotficationsToggleItem
              title="Inbox"
              description="Receive unread notifications via inbox."
              value={settings.is_via_inbox}
              onToggle={() => setViaInbox(!isViaInbox)}
            />
            <NotficationsToggleItem
              title="Email"
              description="Receive an email digest for unread notifications."
              value={settings.is_via_email}
              onToggle={() => setViaEmail(!isViaEmail)}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
        <div className="w-full flex flex-col mt-[30px]">
          <div className="w-full text-[1rem] text-[--base] font-semibold mb-[15px] opacity-70">
            Notifications settings
          </div>
          <NotificationsTypeSettings
            type="project"
            settingsString={settings.project_noti_settings}
            onToggle={handleOnToggle}
          />
          <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
          <NotificationsTypeSettings
            type="task"
            settingsString={settings.task_noti_settings}
            onToggle={handleOnToggle}
          />
          <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
          <NotificationsTypeSettings
            type="event"
            eventNoticeBefore={settings.event_notice_before}
            settingsString={settings.event_noti_settings}
            onToggle={handleOnToggle}
          />
        </div>
      </div>
    );
  }
};

export default NotficationsSettings;
