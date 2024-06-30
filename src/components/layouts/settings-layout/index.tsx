"use client";

import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { settingsSidebarGroups } from "@/configs/sidebar-items";
import Sidebar from "../components/sidebar";
import useRouteInfo from "@/hooks/useRouteInfo";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { description, title } = useRouteInfo();

  return (
    <div className="absolute w-full h-full flex flex-row bg-[--secondary]">
      <Sidebar isOpen groups={settingsSidebarGroups}>
        <div
          onClick={() => router.back()}
          className="flex items-center justify-center gap-[4px] text-[--base] py-[5px] px-[5px] text-[0.85rem]"
        >
          <ChevronLeftIcon />
          <div className="pointer-events-none select-none">Settings</div>
        </div>
      </Sidebar>
      <div
        style={{
          height: "100%",
          width: "calc(100% - 260px)",
        }}
        className="bg-[--primary] box-border border-solid border-l-[1px] border-l-[--border-color]"
      >
        <div className="w-full px-[20%] py-[60px] flex flex-col">
          <div className="w-full text-[--base] font-semibold text-[1.5rem]">
            {title}
          </div>
          <div className="w-full text-[--text-header-color] font-medium text-[0.85rem] pt-[2.5px]">
            {description}
          </div>
          <div className="w-full h-[1px] bg-[--border-color] mt-[30px]"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
