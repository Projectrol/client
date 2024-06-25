"use client";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Priority } from "@/db/repositories/cards.repo";

export default function PriorityIndicator({
  priority,
}: {
  priority: Priority;
}) {
  let priorityValue = 0;

  switch (priority) {
    case Priority.LOW:
      priorityValue = 0;
      break;
    case Priority.MEDIUM:
      priorityValue = 1;
      break;
    case Priority.HIGH:
      priorityValue = 2;
      break;
    case Priority.URGENT:
      priorityValue = 3;
      break;
  }

  return (
    <div
      className="flex flex-wrap justify-start items-end gap-[2.5px] mt-[4px]
    border-solid border-[1px] border-[--border-color] p-[6px] rounded-md shadow-sm"
    >
      {priorityValue < 3 && (
        <>
          {" "}
          <div
            style={{
              background:
                priorityValue >= 0 ? "var(--base)" : "var(--selected-bg)",
              opacity: priorityValue >= 0 ? 0.75 : 0.5,
            }}
            className="w-[4px] h-[7px]"
          />
          <div
            style={{
              background:
                priorityValue >= 1 ? "var(--base)" : "var(--text-header-color)",
              opacity: priorityValue > 1 ? 0.75 : 0.5,
            }}
            className="w-[4px] h-[10px]"
          />
          <div
            style={{
              background:
                priorityValue >= 2 ? "var(--base)" : "var(--text-header-color)",
              opacity: priorityValue > 2 ? 0.75 : 0.5,
            }}
            className="w-[4px] h-[13px]"
          />
        </>
      )}
      {priorityValue === 3 && (
        <div
          className="h-[16px] w-[16px] rounded-sm flex items-center justify-center 
          text-[#ffffff] text-[0.8rem] bg-[#FF7043]"
        >
          <PriorityHighIcon color="inherit" fontSize="inherit" />
        </div>
      )}
    </div>
  );
}
