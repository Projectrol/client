"use client";

import { SidebarGroup } from "@/configs/sidebar-items";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SideBarItem from "./sidebar-item";

const SideBarGroup = ({ group }: { group: SidebarGroup }) => {
  const [isOpen, setOpen] = useState(true);
  const height = group.items.length * 30;

  return (
    <div
      style={{
        width: "calc(100% - 15px)",
      }}
      className="flex flex-col gap-[5px]"
    >
      {group.title !== "" && (
        <div
          onClick={() => group.showToggle && setOpen(!isOpen)}
          className="w-full text-[--base] font-semibold text-[0.85rem]
                px-[10px] py-[6px] rounded-sm
                hover:bg-[--hover-bg]"
        >
          <span className="pointer-events-none select-none">
            {group.title}&nbsp;
          </span>
          {group.showToggle && (
            <ArrowDropDownIcon
              color="inherit"
              style={{
                transition: "transform 0.1s ease",
                fontSize: "1.2rem",
                transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                marginBottom: "1.65px",
              }}
            />
          )}
        </div>
      )}

      <div
        style={{
          transition: "all 0.1s ease",
          height: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
        className="w-full flex flex-col"
      >
        {group.items.map((item) => (
          <SideBarItem key={item.to} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SideBarGroup;
