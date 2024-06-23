"use client";

import { SidebarItem } from "@/configs/sidebar-items";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

const SideBarItem = ({ item }: { item: SidebarItem }) => {
  const pathname = usePathname();
  const router = useRouter();
  const className = clsx(
    "w-full flex items-center h-[30px] gap-[8px] px-[5px] py-[5px] rounded-sm",
    pathname === item.to.split("?")[0] && "bg-[--selected-bg]",
    pathname !== item.to.split("?")[0] && "hover:bg-[--hover-bg]"
  );
  return (
    <div
      onClick={() => router.push(item.to)}
      key={item.title}
      className={className}
    >
      <div className="mb-[3.5px] text-[1rem]">{item.icon}</div>
      <div className="text-[--base] text-[0.82rem] font-semibold pointer-events-none select-none">
        {item.title}
      </div>
    </div>
  );
};

export default SideBarItem;
