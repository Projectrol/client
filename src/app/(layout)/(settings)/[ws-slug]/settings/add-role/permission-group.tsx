"use client";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Permission } from "@/services/api/workspaces-service";

export default function PermissionGroup({
  rTag,
  permissions,
  hideDivider,
  selectedIds,
  handleChange,
}: {
  rTag: string;
  permissions: Permission[];
  hideDivider: boolean;
  selectedIds: number[];
  handleChange: (id: number) => void;
}) {
  return (
    <div
      style={{
        width: "calc(50% - 10px)",
      }}
      className="flex flex-col gap-[20px] p-[20px] mb-[20px] bg-[--secondary] rounded-md shadow-md"
    >
      <div className="w-full uppercase font-semibold text-[--base] text-[0.85rem]">
        {rTag}
      </div>
      {permissions.map((p) => (
        <div className="w-full flex" key={p.id}>
          <div className="w-[60%] flex flex-col gap-[5px] justify-center">
            <div className="w-full text-[--base] font-semibold text-[0.85rem]">
              {p.title} {rTag}
            </div>
            <div className="w-full text-[--base] font-light text-[0.85rem]">
              {p.description}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <Toggle
              className="custom-toggle"
              style={{
                transform: "scale(0.8)",
              }}
              icons={false}
              checked={selectedIds.includes(p.id)}
              onChange={() => handleChange(p.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
