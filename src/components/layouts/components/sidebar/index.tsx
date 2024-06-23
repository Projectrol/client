"use client";

import { SidebarGroup } from "@/configs/sidebar-items";
import SideBarGroup from "../../components/sidebar/sidebar-group";

const Sidebar = ({
  groups,
  children,
}: {
  groups: SidebarGroup[];
  children: React.ReactNode;
}) => {
  return (
    <div className="w-[250px] h-full bg-[--secondary] flex flex-col py-[15px] pl-[15px] relative">
      <div className="w-full color-[--base] font-semibold flex pb-[10px]">
        {children}
      </div>
      <div className="w-full flex-1 flex flex-col gap-[8px] overflow-y-auto">
        {groups.map((group, i) => (
          <SideBarGroup key={i} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
