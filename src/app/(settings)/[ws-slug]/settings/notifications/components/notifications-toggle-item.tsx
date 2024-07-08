"use client";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./notification-toggle.css";

export default function NotficationsToggleItem({
  title,
  description,
  value,
  onToggle,
}: {
  title: string;
  description: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="w-full flex">
      <div className="w-[90%] flex flex-col gap-[2.5px]">
        <div className="w-full text-[--base] text-[0.9rem] font-semibold">
          {title}
        </div>
        <div className="w-full text-[--base] text-[0.85rem]">{description}</div>
      </div>
      <div className="flex-1 flex justify-end ">
        <Toggle
          className="setting-toggle"
          style={{
            background: "red",
          }}
          icons={false}
          checked={value}
          onChange={onToggle}
        />
      </div>
    </div>
  );
}
