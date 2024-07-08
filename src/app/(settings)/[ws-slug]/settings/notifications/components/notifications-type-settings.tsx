"use client";

import { NotificationsService } from "@/services/api/notifications.service";
import NotficationsToggleItem from "./notifications-toggle-item";

export type NotificationType = "project" | "task" | "event";

export default function NotificationsTypeSettings({
  type,
  eventNoticeBefore,
  settingsString,
  onToggle,
}: {
  type: NotificationType;
  eventNoticeBefore?: number;
  settingsString: string;
  onToggle: (strIndex: number, type: NotificationType) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-[20px] pt-[20px]">
      <div className="w-full text-[1rem] text-[--base] font-semibold ">
        {type.charAt(0).toUpperCase() + type.substring(1)}s
      </div>
      <div className="w-full flex flex-col gap-[30px]">
        <NotficationsToggleItem
          title="Add"
          description={`Add to a ${type}`}
          value={parseInt(settingsString.charAt(0)) === 1 ? true : false}
          onToggle={() => onToggle(0, type)}
        />
        <NotficationsToggleItem
          title="Remove"
          description={`Remove from a ${type}`}
          value={parseInt(settingsString.charAt(1)) === 1 ? true : false}
          onToggle={() => onToggle(1, type)}
        />
        <NotficationsToggleItem
          title="Mention"
          description={`Mention in a ${type}`}
          value={parseInt(settingsString.charAt(2)) === 1 ? true : false}
          onToggle={() => onToggle(2, type)}
        />
        {type === "task" && (
          <NotficationsToggleItem
            title="Due"
            description={`Receive a notification when a task you're assigned to is due`}
            value={parseInt(settingsString.charAt(3)) === 1 ? true : false}
            onToggle={() => onToggle(3, type)}
          />
        )}

        {type === "event" && eventNoticeBefore && (
          <NotficationsToggleItem
            title="Notice"
            description={`Receive a notification before an event occured ${eventNoticeBefore} minutes`}
            value={parseInt(settingsString.charAt(3)) === 1 ? true : false}
            onToggle={() => onToggle(3, type)}
          />
        )}
      </div>
    </div>
  );
}
