"use client";

import { SidebarGroup } from "@/configs/sidebar-items";
import SideBarGroup from "../../components/sidebar/sidebar-group";
import { useEffect, useState } from "react";

const Sidebar = ({
  groups,
  children,
  isOpen,
}: {
  groups: SidebarGroup[];
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  return (
    <div
      style={{
        left: isOpen ? 0 : "-250px",
        transition: "left 0.25s ease-in",
      }}
      className="w-[250px] h-full flex flex-col py-[15px] pl-[15px] relative"
    >
      <div className="w-full color-[--base] font-semibold flex pb-[15px]">
        {children}
      </div>
      <div className="w-full flex-1 flex flex-col gap-[20px] overflow-y-auto">
        {groups.map((group, i) => (
          <SideBarGroup key={i} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
